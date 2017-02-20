class Diagram {

	constructor(parameters) {
		this.diagramParameters = parameters;
		this.svg = document.getElementById('balls');

		this.createDiagram();
	}

	createDiagram() {
		this.diagramParameters.forEach((group) => {
			this.createCircleGroup(group);
		})
	}

	createCircleGroup(groupData) {
		let g = document.createElementNS("http://www.w3.org/2000/svg", "g");	
		g.setAttributeNS(null, 'class', 'circle-group');

		groupData.circles.forEach((circle) => {
			this.createCircleElement(g, circle, groupData.backgroundColor);
		})	

		if('bottomText' in groupData) {
			this.createBottomArc(g, groupData);
		}	

		this.svg.appendChild(g);
	}

	createCircleElement(container, data, color) {
		let g = document.createElementNS("http://www.w3.org/2000/svg", "g");	
		g.setAttributeNS(null, 'class', 'circle-element');				

		g.setAttributeNS(null, 'transform', 'translate(' + data.offset.x + ', ' + data.offset.y + ')'); 

		g.onmouseover = function() {		
			container.appendChild(this);		
		}		
		
		this.createTopTooltip(g, data);
		this.createBottomTooltip(g, data);
		this.createCircle(g, data, color);

		container.appendChild(g);		
	}

	createTopTooltip(container, data) {
		let g = document.createElementNS("http://www.w3.org/2000/svg", "g");	
		g.setAttributeNS(null, 'class', 'top-tooltip');	

		let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
		line.setAttributeNS(null, 'x1', data.size * 0.5);   
		line.setAttributeNS(null, 'y1', 0);   
		line.setAttributeNS(null, 'x2', data.size * 0.5);   
		line.setAttributeNS(null, 'y2', (0 - data.size) * data.topLineHeightRate);   
		g.appendChild(line);	

		let topText = document.createElementNS("http://www.w3.org/2000/svg", "text");
		topText.setAttributeNS(null, 'class', 'top-text');

		data.topText.reverse().forEach((el, i) => {
			let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
			tspan.setAttributeNS(null, 'x', data.size * 0.5);      
			tspan.setAttributeNS(null, 'y', (0 - data.size) * data.topLineHeightRate - 4); 
			tspan.setAttributeNS(null, 'dy', -i + 'em');     
			tspan.textContent = data.topText[i];

			topText.appendChild(tspan);
		})

		g.appendChild(topText);

		container.appendChild(g);
	}

	createBottomArc(container, groupData) {
		let circles = groupData.circles;
		let text = groupData.bottomText;
		let lastCircle = circles.slice(-1)[0];
		let	x1 = circles[0].offset.x;
		let	y1 = circles[0].offset.y + circles[0].size/2;
		let	x2 = lastCircle.offset.x + lastCircle.size;
		let	y2 = lastCircle.offset.y + lastCircle.size/2;
		let	r = (x2-x1)/2;

		let line = document.createElementNS("http://www.w3.org/2000/svg", "path");
		line.setAttributeNS(null, 'class', 'bottom-arc');
		line.setAttributeNS(null, 'd', 'M' + x1 + ',' + y1 + ' A' + r + ',' + r + ' 0 1, 0 ' + x2 + ',' + y2);	
		container.appendChild(line);

		let arcText = document.createElementNS("http://www.w3.org/2000/svg", "text");
		arcText.setAttributeNS(null, 'class', 'arc-text');

		text.forEach((el, i) => {
			let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
			tspan.setAttributeNS(null, 'x', x1 + r);      
			tspan.setAttributeNS(null, 'y', y1 + r + 10); 
			tspan.setAttributeNS(null, 'dy', i + 'em');     
			tspan.textContent = text[i];

			arcText.appendChild(tspan);
		})

		container.appendChild(arcText);
	}

	createBottomTooltip(container, circleData) {

		let data = circleData;

		if('bottomTooltip' in data) {
			let g = document.createElementNS("http://www.w3.org/2000/svg", "g");	
			g.setAttributeNS(null, 'class', 'bottom-tooltip');			

			let coordinates = [];

			let additionalLength = data.explosive ? data.explosive.count*data.explosive.radiusStep : 0;

			//вычисляем y-координаты для размещения объектов по вертикали
			data.bottomTooltip.forEach((el, i, arr) => {
				const textBlockSizeY = (i == 0) ? 0 : arr[i-1].text.length * 10; //длина предыдущего блока текста
				const offsetY = (i == 0) ? 20 + additionalLength : 20 + textBlockSizeY + coordinates[i-1]; //если это первый объект, то отступ = 20, иначе отступ = предыдущий отступ + длина предыдущего блока текста
				coordinates.push(offsetY);
			})

			//Длина вертикальной линии = количество строк текста у последнего абзаца * 10 + у-координата последнего объекта
			let lineLength = data.bottomTooltip.slice(-1)[0].text.length * 10 + coordinates.slice(-1)[0];

			let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
			line.setAttributeNS(null, 'x1', data.size * 0.5);   
			line.setAttributeNS(null, 'y1', data.size);   
			line.setAttributeNS(null, 'x2', data.size * 0.5);   
			line.setAttributeNS(null, 'y2', data.size + lineLength);   
			g.appendChild(line);

			let textClass = 'tooltip-text anchor-start', direction = 1;

			if('reversedText' in data) {
				textClass = 'tooltip-text anchor-end';
				direction = -1;
			}

			data.bottomTooltip.forEach((el, i) => {
				let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
				circle.setAttributeNS(null, 'cx', data.size * 0.5);
				circle.setAttributeNS(null, 'cy', data.size + coordinates[i]);
				circle.setAttributeNS(null, 'r', 3);
				circle.setAttributeNS(null, 'fill', performers[el.performer].color);			

				let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
				text.setAttributeNS(null, 'class', textClass);

				el.text.forEach((el_text, j) => {
					let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
					tspan.setAttributeNS(null, 'x', data.size * 0.5 + direction*(10));      
					tspan.setAttributeNS(null, 'y', data.size + coordinates[i] + 3); 
					tspan.setAttributeNS(null, 'dy', j + 'em');     
					tspan.textContent = el_text;

					text.appendChild(tspan);
				})

				g.appendChild(circle);
				g.appendChild(text);
			})

			//рисуем горизонтальную линию
			data.performers.forEach((el, i) => {
				let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
				line.setAttributeNS(null, 'x1', data.size * 0.5 + direction*(10 + data.lineWidth/data.performers.length * i));   
				line.setAttributeNS(null, 'y1', data.size + lineLength + 5);   
				line.setAttributeNS(null, 'x2', data.size * 0.5 + direction*(10 + data.lineWidth/data.performers.length * i + data.lineWidth/data.performers.length));   
				line.setAttributeNS(null, 'y2', data.size + lineLength + 5);  
				line.setAttributeNS(null, 'class', 'bottom-line');
				line.setAttributeNS(null, 'stroke', performers[el].color);   
				g.appendChild(line);
			})

			if('performersNames' in data) {
				data.performersNames.forEach((el, i) => {
					let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
					textClass += ' small-text';
					text.setAttributeNS(null, 'class', textClass);

					el.forEach((el_text, j) => {
						let tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
						tspan.setAttributeNS(null, 'x', data.size * 0.5 + direction*(10 + data.lineWidth/data.performers.length * i));      
						tspan.setAttributeNS(null, 'y', data.size + lineLength + 25); 
						tspan.setAttributeNS(null, 'dy', j + 'em');  
						tspan.setAttributeNS(null, 'dy', j + 'em');     
						tspan.textContent = el_text;

						text.appendChild(tspan);
					})
					g.appendChild(text);
				})
			}

			container.appendChild(g);
		}	
	}

	createCircle(container, data, color) {	
		let g = document.createElementNS("http://www.w3.org/2000/svg", "g");	
		let R = data.size * 0.5;
		g.setAttributeNS(null, 'class', 'big-circle');
		if('explosive' in data) {
			g.setAttributeNS(null, 'class', 'big-circle explosive');

			let initialOpacity = data.explosive.initialOpacity;
			let	count = data.explosive.count;

			while(count) {
				let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
				circle.setAttributeNS(null, 'cx', R);
				circle.setAttributeNS(null, 'cy', R);
				circle.setAttributeNS(null, 'r', 10);
				circle.setAttributeNS(null, 'fill', color);
				circle.setAttributeNS(null, 'class', 'circle-radius');
				circle.style.opacity = initialOpacity;
				g.appendChild(circle);

				initialOpacity += data.explosive.opacityStep;
				count--;
			}
		}

		g.onmouseover = function() {
			let sectors = this.getElementsByClassName('sector');
			[...sectors].forEach((sector, i) => {
				sector.setAttributeNS(null, 'fill', performers[data.performers[i]].color);
			})
			this.parentNode.getElementsByClassName('bottom-tooltip')[0].style.opacity = 1;

			//добавляем opacity ко всему, кроме этого круга
			let circleGroups = document.getElementsByClassName('circle-group');
			[...circleGroups].forEach((group) => {
				[...group.childNodes].forEach((node) => {
					node.style.opacity = 0.3;
				})			
			})	
			this.parentNode.style.opacity = 1;
			this.parentNode.getElementsByClassName('top-tooltip')[0].style.opacity = 0.3;

			//анимируем радиус (explosive)
			if('explosive' in data) {
				let initialR = R + data.explosive.radiusStep*data.explosive.count;
				let radiuses = this.getElementsByClassName('circle-radius');
				[...radiuses].forEach((radius) => {
					radius.setAttributeNS(null, 'r', initialR);
					initialR -= data.explosive.radiusStep;
				})
			}
		}

		g.onmouseout = function() {
			let sectors = this.getElementsByClassName('sector');
			[...sectors].forEach((sector, i) => {
				sector.setAttributeNS(null, 'fill', color);
			})
			this.parentNode.getElementsByClassName('bottom-tooltip')[0].style.opacity = 0;

			//убираем opacity
			let circleGroups = document.getElementsByClassName('circle-group');
			[...circleGroups].forEach((group) => {
				[...group.childNodes].forEach((node) => {
					node.style.opacity = 1;
				})			
			})	
			this.parentNode.getElementsByClassName('top-tooltip')[0].style.opacity = 1;

			//анимируем радиус (explosive)
			if('explosive' in data) {
				let radiuses = this.getElementsByClassName('circle-radius');
				[...radiuses].forEach((radius) => {
					radius.setAttributeNS(null, 'r', 10);
				})
			}

		}

		container.appendChild(g);

		if(data.performers.length > 1) {
			let sectors = this.calculateSectors(data);

			sectors.map((sector) => {
				let newSector = document.createElementNS("http://www.w3.org/2000/svg", "path");
				newSector.setAttributeNS(null, 'fill', color);
				newSector.setAttributeNS(null, 'd', 'M' + sector.L + ',' + sector.L + ' L' + sector.L + ',0 A' + sector.L + ',' + sector.L + ' 0 ' + sector.arcSweep + ',1 ' + sector.X + ', ' + sector.Y + ' z');
				newSector.setAttributeNS(null, 'transform', 'rotate(' + sector.R + ', '+ sector.L+', '+ sector.L+')');
				newSector.setAttributeNS(null, 'class', 'sector');

				g.appendChild(newSector);
			})
		}
		else {
			let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
			circle.setAttributeNS(null, 'fill', color);
			circle.setAttributeNS(null, 'cx', R );
			circle.setAttributeNS(null, 'cy', R);
			circle.setAttributeNS(null, 'r', R);
			circle.setAttributeNS(null, 'class', 'sector');

			g.appendChild(circle);
		}		

		let midCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
		midCircle.setAttributeNS(null, 'cx', R );
		midCircle.setAttributeNS(null, 'cy', R);
		midCircle.setAttributeNS(null, 'r', 12 );
		midCircle.setAttributeNS(null, 'fill', '#fff' );
		midCircle.setAttributeNS(null, 'class', 'small-circle');
		g.appendChild(midCircle);

		let circleText = document.createElementNS("http://www.w3.org/2000/svg", "text");
		circleText.setAttributeNS(null, 'x', R);      
		circleText.setAttributeNS(null, 'y', R + 5);   
		circleText.setAttributeNS(null, 'class', 'circle-text');
		let textNode = document.createTextNode(data.middleText);
		circleText.appendChild(textNode);
		g.appendChild(circleText);
	}

	calculateSectors(data) {
		let sectors = [];

		let l = data.size * 0.5;
		let percentage = 1 / data.performers.length;
		let a = 0; 
		let aRad = 0;
		let z = 0;
		let x = 0;
		let y = 0;
		let X = 0;
		let Y = 0; 
		let R = 0;
		let arcSweep = 0;


		data.performers.map((item, key ) => {
			a = 360 * percentage;
			let aCalc = (a > 180) ? 360 - a : a;
			aRad = aCalc * Math.PI / 180;
			z = Math.sqrt(2*l*l - (2*l*l*Math.cos(aRad)));
			if(aCalc <= 90) {
				x = l*Math.sin(aRad);
			}
			else {
				x = l*Math.sin((180 - aCalc) * Math.PI/180);
			}

			y = Math.sqrt(z*z - x*x);
			Y = y;

			if(a <= 180) {
				X = l + x;
				arcSweep = 0;
			}
			else {
				X = l - x;
				arcSweep = 1;
			}

			sectors.push({
				percentage: item.percentage,
				label: item.middleText,
				arcSweep: arcSweep,
				L: l,
				X: X,
				Y: Y,
				R: R
			});

			R = R + a;
		})

		return sectors
	}	
}

(function() {
	let diagram = new Diagram(data);
})()
