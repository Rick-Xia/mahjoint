import React, { Component } from 'react';
import ResultPanel from '../components/ResultPanel';

class Result extends Component {
    constructor(props) {
        super(props);
        this.monzen = false
        this.pWind = 1
        this.sWind = 1
        this.yaku = { "TOTAL": 0 }

        this.argArray = [ "richi", "ippatsu", "tsumo", "specialDraw", "dora" ]
        this.yakumanArray = [ "bigsanyuan",  "sianko",  "tsuiso",  "greeniso",  "fourxi",  "sikanzi"]
        this.yakuArray = [ "tanyao", "pinfu", "peiikou", "yipai", "sanshoku", "ittsu", "tuitui", "sananko", "sankanzi", "quandaiyao", "raotou", "smallsanyuan", "honitsu", "chinitsu" ]

        this.state = {
            valid: 0
        };
    }

    // 1 han

    // richi: already set in game arg
    richi ( yaku, args, next ) {
        if ( args.ready === "1" ) {
            yaku["Ready hand"] = 1
        } else if ( args.ready === "2" ) {
            yaku["Double-ready"] = 2
        }
        return next( yaku, args, next )
    }

    // ippatsu: already set in game arg
    ippatsu ( yaku, args, next ) {
        if ( args.oneshot === "1" ) {
            yaku["One-shot"] = 1
        }
        return next( yaku, args, next )
    }

    // tsumo: already set in game arg
    tsumo ( yaku, args, next ) {
        if ( args.ron === "1" ) {
            yaku["Self-pick"] = 1
        }
        return next( yaku, args, next )
    }

    // dora: already set in game arg
    dora ( yaku, args, next ) {
        if ( Number.parseInt(args.dora, 10) > 0 ) {
            yaku["Dora"] = Number.parseInt(args.dora, 10)
        }
        return next( yaku, args, next )
    }

    tanyao ( yaku, menzi, janto, next ) {
        if ( janto[0] === 'd' )
            return next( yaku, menzi, janto, next )
        for ( let m of menzi ) {
            if ( m[2] === 'd' || m[3] === 1 || m[5] === 9 )
                return next( yaku, menzi, janto, next )
        }
        yaku["All simples"] = 1
        return next( yaku, menzi, janto, next )
    }

    pinfu ( yaku, menzi, janto, next ) {
        if ( !this.monzen || janto[0] === 'd' )
            return next( yaku, menzi, janto, next )
        for ( let m of menzi ) {
            if ( m[0] !== 'chi' )
                return next( yaku, menzi, janto, next )
        }
        yaku["No-points hand"] = 1
        return next( yaku, menzi, janto, next )
    }

    peiikou ( yaku, menzi, janto, next ) {
        if ( !this.monzen )
            return next( yaku, menzi, janto, next )
        let peikou = 0
        for ( let i = 1; i < menzi.length; ++i ) {
            if ( menzi[i-1][0] !== 'chi' ) continue
            if ( menzi[i-1][2] !== menzi[i][2] ) continue
            if ( menzi[i-1][3] === menzi[i][3] ) {
                peikou += 1
                ++i
            }
        }
        if ( peikou === 1 ) {
            yaku["One set of identical sequences"] = 1
        } else if ( peikou === 2 ) {
            yaku["Two set of identical sequences"] = 3
        }

        return next( yaku, menzi, janto, next )
    }

    yipai ( yaku, menzi, janto, next ) {
        let honors = menzi.filter( m => m[2] === "d" )
        if ( honors.length === 0 ) return next( yaku, menzi, janto, next )
        let dragon = ( num ) => {
            if ( num === 5 ) return "Blank"
            if ( num === 6 ) return "Fortune"
            if ( num === 7 ) return "Center"
        }

        for ( let m of honors ) {
            if ( m[3] === this.pWind ) yaku["Prevailing Wind"] = 1
            if ( m[3] === this.sWind ) yaku["Seat Wind"] = 1

            if ( m[3] >= 5 ) yaku[`Value Tiles ${dragon(m[3])}`] = 1
        }
        return next( yaku, menzi, janto, next )
    }

    // rinshangkaihua: already set in game arg
    // qianggang: already set in game arg
    // haidi/hedi: already set in game arg
    specialDraw ( yaku, args, next ) {
        if ( args.quadDraw === "1" ) {
            yaku["Last tile/Last Draw"] = 1
        } else if ( args.quadDraw === "2" ) {
            yaku["Robbing a quad"] = 1
        } else if ( args.quadDraw === "3" ) {
            yaku["Dead wall draw"] = 1
        }
        return next( yaku, args, next )
    }


    // 2 han
    sanshoku ( yaku, menzi, janto, next ) {
        for ( let i = 2; i < menzi.length; ++i ) {
            if ( menzi[i-2][0] === 'chi' && menzi[i-2][0] === menzi[i-1][0] && menzi[i-2][0] === menzi[i][0] ) {
                if ( menzi[i-2][3] === menzi[i-1][3] && menzi[i-2][3] === menzi[i][3] ) {
                    yaku["Three colour straight"] = (this.monzen) ? 2 : 1
                    return next( yaku, menzi, janto, next )
                }
            }
            else if ( menzi[i-2][0] === 'pon' && menzi[i-2][0] === menzi[i-1][0] && menzi[i-2][0] === menzi[i][0] ) {
                if ( menzi[i-2][3] === menzi[i-1][3] && menzi[i-2][3] === menzi[i][3] ) {
                    yaku["Three colour triplets"] = 2
                    return next( yaku, menzi, janto, next )
                }
            }
        }
        return next( yaku, menzi, janto, next )
    }

    ittsu ( yaku, menzi, janto, next ) {
        if ( menzi[0][0] === 'chi' || menzi[1][0] === 'chi' || menzi[2][0] === 'chi' ) {
            if ( menzi[0][2] === menzi[1][2] && menzi[0][2] === menzi[2][2] ) {
                if ( menzi[0][3] + 3 === menzi[1][3] && menzi[1][3] + 3 === menzi[2][3] ) {
                    yaku["Straight"] = (this.monzen) ? 2 : 1
                    return next( yaku, menzi, janto, next )
                }
            }
        }
        if ( menzi[1][0] === 'chi' || menzi[2][0] === 'chi' || menzi[3][0] === 'chi' ) {
            if ( menzi[1][2] === menzi[2][2] && menzi[1][2] === menzi[3][2] ) {
                if ( menzi[1][3] + 3 === menzi[2][3] && menzi[2][3] + 3 === menzi[3][3] ) {
                    yaku["Straight"] = (this.monzen) ? 2 : 1
                    return next( yaku, menzi, janto, next )
                }
            }
        }
        return next( yaku, menzi, janto, next )
    }

    tuitui ( yaku, menzi, janto, next ) {
        if ( menzi.every(m => m[0] === 'pon') ) {
            yaku["All triplet hand"] = 2
        }
        return next( yaku, menzi, janto, next )
    }

    sananko ( yaku, menzi, janto, next ) {
        let count = 0
        for ( let m of menzi ) {
            if ( m[0] === 'pon' && m[1] === -1 ) count++
        }
        if ( count === 3 ) {
            yaku["Three closed triplets"] = 2
        }
        return next( yaku, menzi, janto, next )
    }

    sankanzi ( yaku, menzi, janto, next ) {
        let count = 0
        for ( let m of menzi ) {
            if ( m[0] === 'ckan' || m[0] === 'kan' ) count++
        }
        if ( count === 3 ) {
            yaku["Three kans"] = 2
        }
        return next( yaku, menzi, janto, next )
    }

    qiduizi ( ppai, spai, mpai, zipai ) {
        for ( let i = 1; i <= 9; ++i ) {
            if ( ppai[i] > 0 && ppai[i] !== 2 ) return false
            if ( spai[i] > 0 && spai[i] !== 2 ) return false
            if ( mpai[i] > 0 && mpai[i] !== 2 ) return false
            if ( i <= 7 ) {
                if ( zipai[i] > 0 && zipai[i] !== 2 ) return false
            }
        }
        return true
    }

        // hun quandaiyao + qing quandaiyao
    quandaiyao ( yaku, menzi, janto, next ) {
        if ( janto[0] !== 'd' && ( !this.ifTileIsLaoTou(janto[1]) )) {
            return next( yaku, menzi, janto, next )
        }
        let zipai = janto[0] === 'd' || menzi.find( m => m[2] === 'd' )
        for ( let m of menzi ) {
            if ( !(m[2] === 'd' || this.ifTileIsLaoTou(m[3]) || this.ifTileIsLaoTou(m[4]) || this.ifTileIsLaoTou(m[5])) ) {
                // fail, call next yaku
                return next( yaku, menzi, janto )
            }
        }
        
        // yaku complete
        if ( zipai ) {
            // update yaku with hun quandaiyao
            yaku["Terminal or honor in each set"] = (this.monzen) ? 2 : 1
            return next( yaku, menzi, janto, next )
        } else {
            // update yaku with qing quandaiyao
            yaku["Terminal in each set"] = (this.monzen) ? 3 : 2
            return next( yaku, menzi, janto, next )
        }
    }

        // hun laotou + qing laotou
    ifTileIsLaoTou ( i ) {
        return i === 1 || i === 9
    }

    raotou ( yaku, menzi, janto, next ) {
        if ( janto[0] !== 'd' && ( !this.ifTileIsLaoTou(janto[1]) )) {
            // fail, call next yaku
            return next( yaku, menzi, janto, next )
        }
        let zipai = janto[0] === 'd' || menzi.find( m => m[2] === 'd' )
        for ( let m of menzi ) {
            if ( !(m[2] === 'd' || (this.ifTileIsLaoTou(m[3]) && this.ifTileIsLaoTou(m[4]) && this.ifTileIsLaoTou(m[5]))) ) {
                // fail, call next yaku
                return next( yaku, menzi, janto )
            }
        }

        // yaku complete
        if ( zipai ) {
            // update yaku with hun laotou
            yaku["All terminals and honors"] = 2
            return next( yaku, menzi, janto, next )
        } else {
            // update yaku with qing laotou
            yaku["All terminals"] = 13
            return next( yaku, menzi, janto, next )
        }
    }

    smallsanyuan ( yaku, menzi, janto, next ) {
        if ( janto[0] !== 'd' || janto[1] < 5 )
            return next( yaku, menzi, janto, next )
        let both = false
        for ( let m of menzi ) {
            if ( m[2] === 'd' && m[3] >= 5 ) {
                if ( both ) {
                    yaku["Little three dragons"] = 2
                    return next( yaku, menzi, janto, next )
                }
                both = true
            }
        }
        return next( yaku, menzi, janto, next )
    }

    // double richi: already set in game arg

    // 3 han
    honitsu ( yaku, menzi, janto, next ) {
        let honorAppeared = false, color
        if ( janto[0] !== 'd' ) color = janto[0]
        else honorAppeared = true

        for ( let m of menzi ) {
            if ( m[2] !== 'd' ) {
                if ( color && m[2] !== color ) {
                    return next( yaku, menzi, janto, next )
                }
                color = m[2]
            } else {
                honorAppeared = true
            }
        }
        if ( honorAppeared ) yaku["Half-flush"] = (this.monzen) ? 3 : 2
        return next( yaku, menzi, janto, next )
    }

    // chun quandaiyao: finished above

    // liang beikou: finished above

    // 6 han
    chinitsu ( yaku, menzi, janto, next ) {
        let color = janto[0]
        for ( let m of menzi ) {
            if ( m[2] !== color ) return next( yaku, menzi, janto, next )
        }
        yaku["Flush"] = (this.monzen) ? 6 : 5
        return next( yaku, menzi, janto, next )
    }

    // yakuman

    kokushi ( ppai, spai, mpai, zipai ) {
        if ( ppai[0] !== ppai[1] + ppai[9] || ppai[1] < 1 || ppai[9] < 1 ) return false
        if ( spai[0] !== spai[1] + spai[9] || spai[1] < 1 || spai[9] < 1 ) return false
        if ( mpai[0] !== mpai[1] + mpai[9] || mpai[1] < 1 || mpai[9] < 1 ) return false
        for ( let i in zipai ) {
            if ( zipai[i] < 1 ) return false
        }
        return true
    }

    bigsanyuan ( yaku, menzi, janto, next ) {
        let count = 0
        for ( let m of menzi ) {
            if ( m[2] === 'd' && m[3] >= 5 ) count++
        }
        if ( count === 3 )
            yaku["Big three dragons"] = 13
        return next( yaku, menzi, janto, next )
    }

    sianko ( yaku, menzi, janto, next ) {
        if ( menzi.every(m => m[0] === 'pon' && m[1] === -1) )
            yaku["Four concealed triplets"] = 13
        return next( yaku, menzi, janto, next )
    }

    tsuiso ( yaku, menzi, janto, next ) {
        if ( janto[0] === 'd' && menzi.every(m => m[2] === 'd') ) 
            yaku["All honors"] = 13
        return next( yaku, menzi, janto, next )
    }

    greeniso ( yaku, menzi, janto, next ) {
        let check_green = ( num, type ) => {
            if ( type === 'd' ) return num === 6
            else if ( type === 's' ) return num === 2 || num === 3 || num === 4 || num ===  6 || num ===  8
            return false
        }

        if ( !check_green(janto[1], janto[0]) ) {
            // fail, call next yaku
            return next( yaku, menzi, janto, next )
        }
        for ( let m in menzi ) {
            if ( !(check_green(m[3], m[2]) && check_green(m[4], m[2]) && check_green(m[5], m[2])) ) {
                // fail, call next yaku
                return next( yaku, menzi, janto, next )
            }
        }

        // yaku complete, update yaku and call next
        yaku["All green"] = 13
        return next( yaku, menzi, janto, next )
    }

    fourxi ( yaku, menzi, janto, next ) {
        let count = 0
        for ( let m of menzi ) {
            if ( m[2] === 'd' && m[3] <= 4 ) count++
        }
        if ( count === 4 ) {// da si xi
            yaku["Big four winds"] = 13

        } else if ( count === 3 ) { // xiao si xi
            if ( janto[0] === 'd' && janto[1] <= 4 ) {
                yaku["Little four winds"] = 13
            }
        }
        return next( yaku, menzi, janto, next )
    }

    kyuuren ( tiles ) { // tiles: { arrays of each color of tiles } [total, 1, 2, 3, ..., 9]
        if ( !this.monzen ) {
            // not monzen, fail. call next yaku
            return false
        }
        let baseForm = [14,3,1,1,1,1,1,1,1,3],
            colorToCheck = tiles.filter( c => c[0] >= 14 )[0]
        if ( !colorToCheck ) {
            // fail bc there are multiple colors
            return false
        }

        for ( let i=1; i<=9; ++i ) {
            if ( colorToCheck[i] < baseForm[i] ) {
                // fail, call next yaku
                return false
            }
        }
        // success, return yakuman
        return true
    }

    sikanzi ( yaku, menzi, janto, next ) {
        if ( menzi.every(m => m[0] === 'kan' || m[0] === 'ckan') )
            yaku["Four kans"] = 13
        return next( yaku, menzi, janto, next )
    }

    // tianhu & dihu:   I dont need to check it
    
    checkYakuman = ( yaku, menzi, janto ) => {
        let index = 0
        let next = () => {
            let task = this.yakumanArray[index++]
            if ( !task ) return yaku
            console.log('now task is: ' + task)
            this[task]( yaku, menzi, janto, next )
        }
        next()
    }

    checkSimpleYaku( yaku, menzi, janto ) {
        let index = 0
        let next = () => {
            let task = this.yakuArray[index++]
            if ( !task ) return yaku
            console.log('now task is: ' + task)
            this[task]( yaku, menzi, janto, next )
        }
        next()
    }

    checkArgYaku( yaku, args ) {
        let index = 0
        let next = () => {
            let task = this.argArray[index++]
            if ( !task ) return yaku
            console.log('now task is: ' + task)
            this[task]( yaku, args, next )
        }
        next()
    }

    // Helper for sorting menzis
    sortMenzi ( m1, m2 ) {
        if ( m1[0] < m2[0] ) return -1
        else if ( m1[0] > m2[0] ) return 1

        if ( m1[2] < m2[2] ) return -1
        else if ( m1[2] > m2[2] ) return 1
        
        if ( m1[3] < m2[3] ) return -1
        else if ( m1[3] > m2[3] ) return 1

        return 0
    }

    countTotalHan ( yaku ) {
        let sum = 0
        for ( let name in yaku ) {
            sum = sum + yaku[name]
        }
        yaku["TOTAL"] = sum
        return sum
    }

    compareYaku ( yaku1, yaku2 ) {
        return yaku1["TOTAL"] >= yaku2["TOTAL"]
    }

    hanCheckingMiddleware ( menzi, janto, ppai, spai, mpai, args ) {
        // 1. check {9 lian}
        if ( this.kyuuren( [ppai, spai, mpai] ) ) {
            this.yaku = { "Nine gates": 13 }
            return
        }

        // 2. check arg yaku
        let argYaku = {}
        this.checkArgYaku( argYaku, args )

        // 3. check remaining yakuman
        // 4. check simple yaku
        for ( let i = 0; i < menzi.length; ++i ) {
            let thisMenzi = menzi[i].sort( this.sortMenzi )
            let yaku = { ...argYaku }
            this.checkYakuman( yaku, thisMenzi, janto[i] )
            this.checkSimpleYaku( yaku, thisMenzi, janto[i] )
            this.countTotalHan( yaku )
            if ( this.compareYaku( yaku, this.yaku ) ) {
                this.yaku = yaku
            }
        }
    } 

    // Helper for sorting tiles
    sortTiles( t1, t2 ) {
        if ( t1[0] < t2[0] ) return -1
        if ( t1[0] > t2[0] ) return 1

        if ( t1[1] < t2[1] ) return -1
        if ( t1[1] > t2[1] ) return 1

        return 0
    }

    // Try parsing menzi into possible winning melts using DFS
    tryParseMenzi ( menziArray, ppai, spai, mpai ) {
        for ( let i = 1; i < ppai.length; ++i ) {
            if ( ppai[i] > 0 ) {
                if ( ppai[i] === 1 ) {
                    if ( i >= ppai.length-2 || ppai[i+1] < 1 || ppai[i+2] < 1 ) return false
                    menziArray.push( ['chi', -1, 'p', i, i+1, i+2] )
                    --ppai[i]; --ppai[i+1]; --ppai[i+2];
                }
                else if ( ppai[i] === 2 ) return false // double janto
                else if ( ppai[i] === 3 ) menziArray.push( ['pon', -1, 'p', i, i, i] )
                else if ( ppai[i] === 4 ) {
                    menziArray.push( ['pon', -1, 'p', i, i, i] );
                    if ( i >= ppai.length-2 || ppai[i+1] < 1 || ppai[i+2] < 1 ) return false
                    menziArray.push( ['chi', -1, 'p', i, i+1, i+2] )
                    ppai[i] -= 4; --ppai[i+1]; --ppai[i+2];
                }
            }
            if ( spai[i] > 0 ) {
                if ( spai[i] === 1 ) {
                    if ( i >= spai.length-2 || spai[i+1] < 1 || spai[i+2] < 1 ) return false
                    menziArray.push( ['chi', -1, 's', i, i+1, i+2] )
                    --spai[i]; --spai[i+1]; --spai[i+2];
                }
                else if ( spai[i] === 2 ) return false // double janto
                else if ( spai[i] === 3 ) menziArray.push( ['pon', -1, 's', i, i, i] )
                else if ( spai[i] === 4 ) {
                    menziArray.push( ['pon', -1, 's', i, i, i] );
                    if ( i >= spai.length-2 || spai[i+1] < 1 || spai[i+2] < 1 ) return false
                    menziArray.push( ['chi', -1, 's', i, i+1, i+2] )
                    spai[i] -= 4; --spai[i+1]; --spai[i+2];
                }
            }
            if ( mpai[i] > 0 ) {
                if ( mpai[i] === 1 ) {
                    if ( i >= mpai.length-2 || mpai[i+1] < 1 || mpai[i+2] < 1 ) return false
                    menziArray.push( ['chi', -1, 'm', i, i+1, i+2] )
                    --mpai[i]; --mpai[i+1]; --mpai[i+2];
                }
                else if ( mpai[i] === 2 ) return false // double janto
                else if ( mpai[i] === 3 ) menziArray.push( ['pon', -1, 'm', i, i, i] )
                else if ( mpai[i] === 4 ) {
                    menziArray.push( ['pon', -1, 'm', i, i, i] );
                    if ( i >= mpai.length-2 || mpai[i+1] < 1 || mpai[i+2] < 1 ) return false
                    menziArray.push( ['chi', -1, 'm', i, i+1, i+2] )
                    mpai[i] -= 4; --mpai[i+1]; --mpai[i+2];
                }
            }
        }
        console.log(`temp menzi size is: ` + menziArray.length )
        console.log('temp menzi is: ' + JSON.stringify(menziArray) )
        if ( menziArray.length === 4 ) return true
        else return false
    }

    isValidHand ( tiles, combis, args ) {
        let menzi = [], janto = [], melts = [ ...combis ]
        tiles.sort( this.sortTiles )
        
        let zipai = [0,0,0,0,0,0,0,0]
        let ppai = [0,0,0,0,0,0,0,0,0,0], spai = [0,0,0,0,0,0,0,0,0,0], mpai = [0,0,0,0,0,0,0,0,0,0]
        tiles.map(t => {
            if ( t[0] === 'p' ) { ++ppai[ t[1] ]; ++ppai[0] }
            else if ( t[0] === 's' ) { ++spai[ t[1] ]; ++spai[0] }
            else if ( t[0] === 'm' ) { ++mpai[ t[1] ]; ++mpai[0] }
            else { ++zipai[ t[1] ]; ++zipai[0] }
            return t;
        })

        console.log('ppai is: ' + JSON.stringify(ppai))
        console.log('mpai is: ' + JSON.stringify(mpai))
        console.log('spai is: ' + JSON.stringify(spai))
        console.log('zipai is: ' + JSON.stringify(zipai))

        // check {kokushi}, {7 duizi}
        if ( this.kokushi(ppai, spai, mpai, zipai) ) {
            this.yaku = { "Thirteen orphans": 13 }
            return true
        }
        if ( this.qiduizi(ppai, spai, mpai, zipai) ) {
            this.yaku = { "Seven pairs": 2 }
            return true
        }

        // Now try to decide what is janto, but before that, we should get rid of all zipai
        if ( zipai[0] > 0 ) {
            for ( let i = 1; i < zipai.length; ++i ) {
                if ( zipai[i] === 0 ) continue
                else if ( zipai[i] === 1 || zipai[i] === 4 ) return false
                else if ( zipai[i] === 2 ) {
                    if ( janto.length > 0 ) return false // double janto
                    janto.push( ['d', i] )
                }
                else if ( zipai[i] === 3 ) melts.push( ['pon', -1, 'd', i, i, i] )
            }
        }

        // Now we can try to parse normal tiles
            // if an eye is already discovered in zipai
            //  then normal tiles must have valid 4 menzi
        if ( janto.length > 0 ) {
            let tempMenzi = [ ...melts ]
            if ( !this.tryParseMenzi(tempMenzi, ppai.slice(), spai.slice(), mpai.slice()) ) return false
            menzi.push( tempMenzi )
        }
            // No eye is found in zipai
            //  try parse normal tiles for finding 4 menzi
        else {
            for ( let i = 1; i <= 9; ++i ) {
                if ( ppai[0] > 0 ) {
                    if ( ppai[i] > 1 ) {
                        let tempMenzi = [ ...melts ], tempppai = ppai.slice()
                        tempppai[i] -= 2
                        if ( this.tryParseMenzi(tempMenzi, tempppai, spai.slice(), mpai.slice()) ) {
                            // if success, now menzi's are in tempMenzi
                            menzi.push( tempMenzi )
                            janto.push( ['p', i] )
                        }
                    }
                }
                if ( spai[0] > 0 ) {
                    if ( spai[i] > 1 ) {
                        let tempMenzi = [ ...melts ], tempspai = spai.slice()
                        tempspai[i] -= 2
                        if ( this.tryParseMenzi(tempMenzi, ppai.slice(), tempspai, mpai.slice()) ) {
                            // if success, now menzi's are in tempMenzi
                            menzi.push( tempMenzi )
                            janto.push( ['s', i] )
                        }
                    }
                }
                if ( mpai[0] > 0 ) {
                    if ( mpai[i] > 1 ) {
                        let tempMenzi = [ ...melts ], tempmpai = mpai.slice()
                        tempmpai[i] -= 2
                        if ( this.tryParseMenzi(tempMenzi, ppai.slice(), spai.slice(), tempmpai) ) {
                            // if success, now menzi's are in tempMenzi
                            menzi.push( tempMenzi )
                            janto.push( ['m', i] )
                        }
                    }
                }
            }
        }

        console.log('Final all possible menzi\'s are: ' + JSON.stringify(menzi))
        console.log('Final all possible janto\'s are: ' + JSON.stringify(janto))

        // if no valid winning conditions met, return false to prevent point calculation
        if ( menzi.length === 0 ) return false

        // TODO: else return true and start calculating points
        //        give special shortcut to Lotus.
        this.hanCheckingMiddleware(menzi, janto, ppai, spai, mpai, args)
        return true;
    }

    calculatePoints( tiles, combis, args ) {
        // console.log(`tiles received, which are: ${JSON.stringify(tiles)}`)
        // console.log(`Combis received, which are: ${JSON.stringify(combis)}`)
        console.log(`args received, which are: ${JSON.stringify(args)}`)
        if ( combis.length === 0 ) this.monzen = true
        this.pWind = Number.parseInt(args.prevalentWind, 10)
        this.sWind = Number.parseInt(args.seatWind, 10)

        if ( this.isValidHand( tiles, combis, args ) ) {
            this.setState({ valid: 1 })
        }
        else this.setState({ valid: -1 })
    }

    removeResult() {
        this.monzen = false
        this.yaku = { "TOTAL": 0 }
        this.setState({ valid: 0 });
    }

    render() {
        return <ResultPanel valid={this.state.valid} yaku={this.yaku} />;
    }
}

export default Result;
