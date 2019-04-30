/*
let Swipter = (function(){
	let root = document
	let eventHub = {'swipRight':[], 'swipLeft':[]}
	function bind(node) {
		root = node
	}
	function on(type,fn) {
		if(eventHub[type]) {
			eventHub[type].push(fn)
		}
	}
	var initX
	var newX
	var clock


	root.ontouchstart = function(e) {
		initX = e.changedTouches[0].pageX
	}
	root.ontouchmove = function(e) {
		if(clock) clearInterval(clock)
		clock = setTimeout(()=>{
			newX = e.changedTouches[0].pageX
			if(newX - initX > 0){
				eventHub['swipRight'].forEach(fn=>fn())
			} else {
				eventHub['swipLeft'].forEach(fn=>fn())
			}
		}, 100)

	}
	return {
		bind: bind,
		on: on
	}
})()
 
Swipter.bind(document.querySelector('#box'))
Swipter.on('swipLeft', function(){
	console.log('swipLeft')
})
Swipter.on('swipLeft', function(){
	console.log('swipLeft 111')
})
Swipter.on('swipRight', function(){
	console.log('swipRight')
})
Swipter.on('swipRight', function(){
	console.log('swipRight 111')
})
*/

class Swiper {
  constructor(node) {
    if(!node) throw new Error('需要传递需要绑定的DOM元素')
    let root = typeof node === 'string' ? document.querySelector(node) : node
    let eventHub = {'swipLeft': [], 'swipRight': []}

    let initX
    let newX
    let clock
    root.ontouchstart = function(e) {
      initX = e.changedTouches[0].pageX
    }
    root.ontouchmove = function(e) {
      if(clock) clearInterval(clock)
      clock = setTimeout(()=>{
        newX = e.changedTouches[0].pageX
        if(newX - initX > 50){
          eventHub['swipRight'].forEach(fn=>fn.bind(root)())
        }else if(initX - newX > 50){
          eventHub['swipLeft'].forEach(fn=>fn.bind(root)())
        }
      },100)
    }

    this.on = function(type, fn) {
      if(eventHub[type]) {
        eventHub[type].push(fn)
      }
    }

    this.off = function(type,fn) {
      let index = eventHub[type].indexOf(fn)
      if( index !== -1) {
        eventHub[type].splice(index, 1)
      }
    }

  }
}

export default Swiper