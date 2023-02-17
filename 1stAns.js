let arr = [ 2, 3, 11, 30, 3, 1, 4, 14, 27, 17, 5 ]

function findPair(){
  
  
  for(let i=0;i<arr.length-2;i++){
    

      for(let j=i+1;j<arr.length;j++){
        arr.map(item=>{
          if(arr[i]+arr[j] === item){

              console.log(arr[i],arr[j],(arr[i]+arr[j]));
              
          }
        })
      }
   }
}
findPair()