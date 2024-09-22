export function mouseMovement(obj, deltaChange){
    addEventListener('mousedown', (event)=>{
      obj.mouseDown = true;
    })
    addEventListener('mouseup', (event)=>{
      obj.mouseDown = false;
    })
  
    addEventListener('mousemove', (event)=>{
      console.log('amogus');
      if(obj.mouseDown){
        obj.changeX += deltaChange * (event.movementX);
        obj.changeY += deltaChange * (event.movementY);
        // obj.changeX += deltaChange * Math.sign(event.movementX);
        // obj.changeY += deltaChange * Math.sign(event.movementY);
      }
    })
  }