let scene, camera, renderer, controls, light, model;




      function init() {
        container = document.getElementById('container');
           

        scene = new THREE.Scene();
      
        scene.background = new THREE.Color(0xdddddd);
        scene.background = new THREE.CubeTextureLoader()
          .load( [
            'posx.jpg',
            'negx.jpg',
            'posy.jpg',
            'negy.jpg',
            'posz.jpg',
            'negz.jpg'
          ] );

        camera = new THREE.PerspectiveCamera(60,window.innerWidth/window.innerHeight,1,1000);
        camera.position.set(-100, -100, 500);
        controls = new THREE.OrbitControls(camera);
        
       // scene.add( new THREE.AxesHelper(500));

        light = new THREE.SpotLight(0xffa95c,4);
        light.position.set(-50,50,50);
        light.castShadow = true;
        light.shadow.bias = -0.0001;
        light.shadow.mapSize.width = 1024*4;
        light.shadow.mapSize.height = 1024*4;
        scene.add( light );

        hemiLight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
        scene.add(hemiLight);

        renderer = new THREE.WebGLRenderer();
        renderer.toneMapping = THREE.NoToneMapping;
        renderer.toneMappingExposure = 1.9; 
        renderer.setSize(window.innerWidth,window.innerHeight);
        renderer.shadowMap.enabled = true;
        container.appendChild( renderer.domElement );
        
       
        
        
        new THREE.GLTFLoader().load('model/scene.gltf', result => { 
          model = result.scene.children[0]; 
          model.position.set(0,-5,-25);
          model.traverse(n => { if ( n.isMesh ) {
            n.castShadow = true; 
            n.receiveShadow = true;
            if(n.material.map) n.material.map.anisotropy = 1; 
          }});

          gsap.to(model.rotation, {
            scrollTrigger: {
            trigger: "#trigger",
            start: "top top",
            end: "bottom top",
            scrub: true,
            toggleActions: "restart pause resume pause"
          },
            z: 2 * 3.14
          });
         
          scene.add(model);
          

          animate();
        });
        
      }
      function animate() {
        renderer.render(scene,camera);
        light.position.set( 
          camera.position.x + 10,
          camera.position.y + 10,
          camera.position.z + 10,
        );
        console.log(camera.position)
        requestAnimationFrame(animate);
      }

      init();


gsap.registerPlugin(ScrollTrigger);
/* GSAP PARA MOVER TITULOS 

titles = document.querySelectorAll("h2");


titles.forEach(title=>{
    gsap.from(".wrap", {       
        scrollTrigger:{
            trigger: title,
            scrub: true,
            toggleActions: "restart pause restart none"
        },
        duration: 0.5,
        stagger: 0.07,
        scale: 1.1,
        x:200,
        autoAlpha:0.9,
        opacity:0.6
    }) 
})

*/


window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}






var acAnimated = {Plugins: {}};
acAnimated.Plugins.SplitText = function(element, options) {
	if (!options.hasOwnProperty("words")) options.words = 1;
	if (!options.hasOwnProperty("chars")) options.chars = 1;
	if (!options.hasOwnProperty("spacing")) options.spacing = 5;
	this.searchTextNodes = function(element) {
		var foundTextNodes = [];
		if (element == null || element == undefined) return foundTextNodes;
		for (var i=0; i<=element.childNodes.length-1; i++) {
			var node = element.childNodes[i];
			if (node.nodeName == "#text") { //text found
				foundTextNodes.push(node);
			} else {
				var foundTextNodes = foundTextNodes.concat(this.searchTextNodes(node));
			}
		}
		return foundTextNodes;
	}
	this.createElement = function(text, relatedNode) {
		var node = document.createElement("div");
		var nodeText = document.createTextNode(text);
		node.nodeText = nodeText;
		node.appendChild(nodeText);
		node.style.display = "inline-block";
		node.style.position = "relative";
		if (text.trim() == "") node.style.width = String(options.spacing) + "px";
		relatedNode.parentNode.insertBefore(node, relatedNode);
		return node;
	}
	this.splitCharacters = function(textNode) {
		var characters = textNode.nodeValue.toString();
		var chars = [];
		if (characters.trim() != "") {
			for (var c=0; c<=characters.length-1; c++) {
				var character = characters.substr(c, 1)
				var char = this.createElement(character, textNode);
				if (character.trim() != "") chars.push(char);
			}
			textNode.parentNode.removeChild(textNode);
		}
		return chars;
	}
	this.splitWords = function(textNode) {
		var textWords = textNode.nodeValue.toString().split(" ");
		var words = [];
		for (var w=0; w<=textWords.length-1; w++) {
			var textWord = textWords[w];
			var word = this.createElement(textWord, textNode);
			if (textWord.trim() != "") words.push(word);
			if (w < textWords.length-1) this.createElement(" ", textNode); //spacing for word
		}
		textNode.parentNode.removeChild(textNode);
		return words;
	}
	this.splitTextNodes = function(textNodes) {
		var splitText = {words: [], chars: []};
		for (var i=0; i<=textNodes.length-1; i++) {
			var textNode = textNodes[i];
			if (options.words == 0) {
				splitText.chars = splitText.chars.concat(this.splitCharacters(textNode));
			} else {
				var words = this.splitWords(textNode);
				if (options.chars == 1) {
					for (var w=0; w<=words.length-1; w++) {
						word = words[w];
						var chars = this.splitCharacters(word.nodeText);
						splitText.chars = splitText.chars.concat(chars);
						word.chars = chars;
					}
				}
				splitText.words = splitText.words.concat(words);
			}
		}
		return splitText;
	}
	var textNodes = this.searchTextNodes(element);
	var splitText = this.splitTextNodes(textNodes);
	return splitText;
}


acAnimated.randomNumber = function(min, max) {
	var num = min + Math.floor(Math.random() * (max - (min - 1)));
	return num;
}
acAnimated.randomDirection = function(number) {
	var direction = Math.floor(Math.random() * 2);
	if (direction == 0) number = 0 - number;
	return number;
}
acAnimated.animateChar = function(char) {
	var timeline = new TimelineMax({});
	timeline.from(char, acAnimated.randomNumber(3, 5) / 10, {top: acAnimated.randomDirection(acAnimated.randomNumber(10, 50)), rotationZ: acAnimated.randomDirection(acAnimated.randomNumber(90, 360)), rotationX: acAnimated.randomDirection(acAnimated.randomNumber(90, 360)), opacity: 0});
	return timeline;
}
acAnimated.animateWord = function(word) {
	var timeline = new TimelineMax({});
	timeline.from(word, acAnimated.randomNumber(3, 5) / 10, {top: acAnimated.randomDirection(acAnimated.randomNumber(10, 50)), rotationX: acAnimated.randomDirection(acAnimated.randomNumber(90, 360)), opacity: 0});
	return timeline;
}





function getSplit(text){
  var splitText = acAnimated.Plugins.SplitText(text, {words: 1, chars: 1, spacing: 10});
  var timeline = new TimelineMax({repeat: 0, duration: 30, delay:2});
  for (var i=0; i<=splitText.chars.length-1; i++) {
    var char = splitText.chars[i];
    timeline.add("animated_char_" + String(i), acAnimated.randomNumber(1, 20)/ 10);
    timeline.add(acAnimated.animateChar(char), "animated_char_" + String(i));
  }


  timeline
  .to(text, 3, {})
  .to(text, 1, {opacity: 0});
}



const redLog = document.querySelector("#primero");
const redLog2 = document.querySelector("#segundo");
const redLog3 = document.querySelector("#tercero");
const redLog4 = document.querySelector("#cuarto");
const redLog5 = document.querySelector("#quinto");

ScrollTrigger.create({
  trigger: "#primero",
  onEnter: () => getSplit(redLog) 
});

    
ScrollTrigger.create({
  trigger: "#segundo",
  onEnter: () => getSplit(redLog2)
});


ScrollTrigger.create({
  trigger: "#tercero",
  scrub: true,
  onEnter: () => getSplit(redLog3)
});


ScrollTrigger.create({
  trigger: "#cuarto",
  scrub: true,
  onEnter: () => getSplit(redLog4)
});


ScrollTrigger.create({
  trigger: "#quinto",
  scrub: true,
  onEnter: () => getSplit(redLog5)
});
  


$(window).bind("load", function () {
  $('#work-in-progress').fadeOut(100);    
});