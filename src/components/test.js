function handToPattern(hand) {
	// Valid tiles: 1p-9p 1s-9s 1m-9m Ez Wz Sz Nz Cz Hz Pz
	var combinations = [];
	var currentCombination = [];
	var currentType = null;
	var currentIndex = null;
	for (var j = 0; j < hand.length; j++) {
		var tile = hand[j];
		var type = tile[1];
		var index = tile[0];
		if (!currentCombination.length) {
			currentCombination.push(1);
			currentType = type;
			currentIndex = index;
		} else if (type === currentType && index === currentIndex) {
			currentCombination[currentCombination.length - 1] += 1;
		} else if (type === currentType && (index - 0) && (currentIndex - 0) && (index - 0 === currentIndex - 0 + 1)) {
			currentIndex = index;
			currentCombination.push(1)
		} else {
			combinations.push(currentCombination);
			currentCombination = [1];
			currentType = type;
			currentIndex = index;
		}
	}
	if (currentCombination.length) {
		combinations.push(currentCombination);
	}
	return combinations.map(function (subpattern) { return subpattern.join('.') }).join('-');
}

// 对给定的拆牌方式，枚举符合此拆牌方式（眼、刻子、顺子）的所有可能连续数牌的组合
function enumeratePatternsEMP(H, n, hand, cov, useeye, melds, meldPattern, hasEye, nPung, nChi) {
	if (useeye) for (var suit = 1; suit <= 9; suit++) {
		hand[n] = suit + 'x';
		hand[n + 1] = suit + 'x';
		cov[suit] += 2;
		enumeratePatternsEMP(H, n + 2, hand, cov, false, melds, meldPattern, true, nPung, nChi);
		cov[suit] -= 2;
	} else if (melds) {
		var usePung = meldPattern & (1 << (melds - 1));
		if (usePung) for (var suit = 1; suit <= 9; suit++) {
			hand[n] = suit + 'x';
			hand[n + 1] = suit + 'x';
			hand[n + 2] = suit + 'x';
			cov[suit] += 3;
			if (cov[suit] <= 4) enumeratePatternsEMP(H, n + 3, hand, cov, false, melds - 1, meldPattern, hasEye, nPung + 1, nChi);
			cov[suit] -= 3;
		} else for (var suit = 1; suit <= 7; suit++) {
			hand[n] = suit + 'x';
			hand[n + 1] = (suit + 1) + 'x';
			hand[n + 2] = (suit + 2) + 'x';
			cov[suit] += 1, cov[suit + 1] += 1, cov[suit + 2] += 1;
			if (cov[suit] <= 4 && cov[suit + 1] <= 4 && cov[suit + 2] <= 4) enumeratePatternsEMP(H, n + 3, hand, cov, false, melds - 1, meldPattern, hasEye, nPung, nChi + 1);
			cov[suit] -= 1, cov[suit + 1] -= 1, cov[suit + 2] -= 1;
		}
	} else {
		var regularHand = hand.slice(0, n).sort();
		var key = handToPattern(regularHand);
		if (/-/.test(key)) return;
		var digits = (hasEye ? 1 : 0) + '' + nPung + '' + nChi;
		if (!H[key]) {
			H[key] = {};
			H[key][digits] = true
		} else if (!H[key][digits]) {
			H[key][digits] = true
		}
	}
}
// 枚举拆牌方式并存入 H 表
function enumeratePatterns() {
	var H = {};
	for (var useeye = 0; useeye < 2; useeye++) for (var melds = 0; melds < 5; melds++) if (useeye || melds) for (var meldPattern = 0; meldPattern < 1 << melds; meldPattern += 1) {
		enumeratePatternsEMP(H, 0, [], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], useeye, melds, meldPattern, useeye, 0, 0);
	}
	for (var k in H) {
		H[k] = Object.keys(H[k]);
	}
	return H;
}
// 对潜在的和牌手牌，进行最后的校验
function checkPseudoAgari(n, checks, e, p, c, results) {
	if (n >= checks.length) {
		if(e === 1 && (p + c) === 4){
			results.push([e, p, c])
		}
	} else {
		for (var k = 0; k < checks[n].length; k++) {
			checkPseudoAgari(n + 1, checks, e + (checks[n][k][0] - 0), p + (checks[n][k][1] - 0), c + (checks[n][k][2] - 0), results)
		}
	}
}
function isAgari(hand) {
	hand = hand.sort();
	var pattern = handToPattern(hand).split('-');
	var checks = [];
	for (var j = 0; j < pattern.length; j++) {
		if (!H[pattern[j]]) return [];
		checks[j] = H[pattern[j]]
	}
	var results = [];
	checkPesudoAgari(0, checks, 0, 0, 0, results);
	return results;
}

var H = enumeratePatterns();
console.log(isAgari(['1s', '1s', '1s', '2s', '2s', '3s', '4s', '5s', '4s', '5s', '6s', 'Ez', 'Ez', 'Ez']))
console.log(isAgari(['1p', '1p', '1s', '2s', '2s', '3s', '4s', '5s', '4s', '5s', '6s', 'Ez', 'Ez', 'Ez']))
console.log(isAgari(['9s', '1s', '1s', '2s', '2s', '3s', '4s', '5s', '4s', '5s', '6s', 'Ez', 'Ez', 'Ez']))
console.log(isAgari(['Ez', 'Ez', 'Ez', 'Nz', 'Nz', 'Nz', 'Wz', 'Wz', 'Wz', 'Sz', 'Sz', 'Sz', 'Pz', 'Pz']))
console.log(isAgari(['1s', '1s', '1s', '1s', '2s', '2s', '2s', '2s', '3s', '3s', '3s', '3s', '4s', '4s']))