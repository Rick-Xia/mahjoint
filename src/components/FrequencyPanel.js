import React from 'react'
import * as d3 from 'd3'
import data from '../extradata/frequency.js'
import '../styles/freq.css'

const svgWidth = 500, svgHeight = 300, barPadding = 5
const yscale = d3.scaleLinear()
                .domain([0.0002, 45.1])
                .range([5, 250])

const barWidth = (svgWidth / data.length)

class FrequencyPanel extends React.Component {
    state = {}

    componentDidMount() {
        this.generateBarChart()
    }

    generateBarChart = () => {
        console.log('d3 operation going')

        const node = this.node
        let svg = d3.select(node)

        svg.append("text")
            .attr("transform", "translate(100,0)")
            .attr("x", 50)
            .attr("y", 50)
            .attr("font-size", "24px")
            .text("Mahjong Yaku Apperance Frequencies")

        let g = svg.append("g")
            .attr("transform", "translate(" + 100 + "," + 100 + ")");


        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .on("mouseover", onMouseOver)
            .on("mouseout", onMouseOut)
            .attr('class', 'bar')
            .attr("name", function(d) {
                return d.name
            })
            .attr("y", function(d) {
                return svgHeight - yscale(d.freq)
            })
            .attr("height", function(d) { 
                return yscale(d.freq)
            })
            .attr("width", barWidth - barPadding)
            .attr("transform", function (d, i) {
                let translate = barWidth * i + 50
                return "translate("+ translate +")"
            })

        function onMouseOver (d, i) {
                d3.select(this).attr('class', 'highlight');
                d3.select(this)
                  .transition()
                  .duration(400)
                  .attr("y", function(d) { return svgHeight - yscale(d.freq) * 1.1  })
                  .attr("height", function(d) { return yscale(d.freq) * 1.1 })
                
                g.append("text")
                    .attr('class', 'val') 
                    .attr('y', 100)
                    .text(function() {
                        return [ d.name + ': ' + d.freq + '%' ]
                    })
                    .attr("transform", function (d, i) {
                        let translate = barWidth * i + 50
                        return "translate("+ translate +")"
                    })
            }
        
        function onMouseOut (d, i) {
                d3.select(this).attr('class', 'bar');
                d3.select(this)
                  .transition()
                  .duration(400)
                  .attr("y", function(d) { return svgHeight - yscale(d.freq)  })
                  .attr("height", function(d) { return yscale(d.freq) })

                d3.selectAll('.val')
                    .remove()
            }
    }

    render() {
        return (
            <svg className="bar-chart" ref={node => this.node = node} width={svgWidth + 100} height={svgHeight + 30}></svg>
        )
    }
}

export default FrequencyPanel
