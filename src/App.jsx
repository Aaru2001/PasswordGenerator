import { useState ,useCallback,useEffect ,useRef} from 'react'



function App() {
  const [length, setlength] = useState(10)
  const[numberAllowed, setnumber]=useState(false)
  const[charAllowed, setchar]=useState(false)
  const[Passsword, setpassword]=useState("")


  //useref

  const passwordRef=useRef(null)

  const passwordGenertor = useCallback(()=>{
  let pass=""
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstvwxyz"
  if(numberAllowed) str+= "0123456789"
  if(charAllowed)  str+= "!@#$%^&*(){}_~"

  for(let i =1 ;i<length;i++){
    let char = Math.floor(Math.random()*str.length+1)

    pass += str.charAt(char)
  }

  setpassword(pass)



  },
    [length,numberAllowed,charAllowed,setpassword])

    const copypassword = useCallback(()=>{
    passwordRef.current?.select();
    

      window.navigator.clipboard.writeText(Passsword);
    },[Passsword])

useEffect(()=>{ passwordGenertor()},[length,charAllowed,numberAllowed,passwordGenertor])
  

  

  return (
    <>
    <div className=' justify-center mt-[10pc]  w-[500px] mx-auto shadow-md rounded-lg px-4 my-8 text-orange-600 bg-gray-700 h-[150px] text-center'>
    
    <h1 className='text-white text-center my-1 py-3'>Password Genrator</h1>
    
    <div className='flex shadow rounded-lg overflow-hidden mb-2'>
    <input
     type="text"
     value ={Passsword}
     placeholder='Password'
     readOnly

     ref={passwordRef}
     className='outline-none w-full py-1 px-3 ' />
      <button 
      onClick={copypassword}
      className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0  hover:bg-blue-300 hover:text-black'>Copy</button>

</div>


<div className='flex text-sm gap-x-5'>
<div className=' flex items-center gap-x-1'>
  <input 
  type="range" 
  min={6} 
  max={20}
  value={length}
  className='cursor-pointer'
  onChange={(e)=>setlength(e.target.value)}/>
  <label> Length:{length}</label>

</div>
<div className='flex items-center gap-x-2'>
  <input 
    type='checkbox'
    defaultChecked={numberAllowed}
   id="numberInput"
   onChange={()=>{
      setnumber((prev) => !prev);
   }}
  

  />

  <label htmlFor ="numberInput">Numbers </label>
</div>

<div className='flex items-center gap-x-2'>
  <input 
    type='checkbox'
    defaultChecked={charAllowed}
   id="characterInput"
   onChange={()=>{
      setchar((prev) => !prev);
   }}
  

  />

  <label htmlFor ="characterInput">Character</label>
</div>

</div>


     </div>
 
    </>
  )
}

export default App
