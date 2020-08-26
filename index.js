function drawGrid(percentage, cellPadding, color, trans1, trans2){
  const width = 400;
  const height = 400;
  const cellWidth = width/ 10;
  const cellHeight = height/ 10;
  const transDur = 1000;
  const ovrAllTransDel = 250;

  const numArr = Array.from(Array(100).keys());
  const numData = numArr.map(d => {
    const split = d.toString().split("");
    return {
      column: (split.length > 1) ? +split[0] + 1 : 1,
      row: (split.length > 1) ? +split[1] + 1 : +split[0] + 1,
      value: d + 1
    }
  });

  const bandScale = d3.scaleBand()
                      .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                      .range([0, width]);

  const bandRow = d3.scaleBand()
                      .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse())
                      .range([0, height]);

  const svgG = d3.select('svg.svgGrid')
                  .append('g')
                  .classed('gridG', true);

  svgG.selectAll('rect.cell')
      .data(numData)
      .enter()
      .append('rect')
      .classed('cell', true)
      .attr('x', d => bandScale(d.row))
      .attr('y', d => bandRow(d.column))
      .attr('width', cellWidth - cellPadding)
      .attr('height', cellHeight - cellPadding)
      .style('fill', color.bG);

  // iterative transition from the bottom up
  if (trans1) {
    svgG.selectAll('rect.cell')
        .filter(d => d.value <= percentage)
        .transition()
        .delay((d, i) => ovrAllTransDel + (i * (transDur/percentage)))
        .duration(transDur/percentage)
        .style('fill', color.fill)
  }

  // uniform color transition across the board
  if (trans2) {
    svgG.selectAll('rect.cell')
        .filter(d => d.value <= percentage)
        .transition()
        .delay(ovrAllTransDel)
        .duration(transDur)
        .style('fill', color.fill)
  }
}

// sample try run for the function
drawGrid(
  54,
  1,
  {
    fill: 'purple',
    bG: '#eee'
  },
  true,
  false
);
