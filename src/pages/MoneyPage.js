import Navbar from '../components/navbar'
import {useEffect, useState} from "react";



export default function MoneyPage(){

const[name,setName]= useState('');
const[datetime,setDatetime]= useState('');
const[description,setdescription]= useState('');
const[transactions,setTransactions]= useState([])
const[toggle,setToggle]= useState(true);

useEffect(()=>{
    getTransaction().then(setTransactions);
     
  
 },[]);
   

 async function getTransaction(){
  const url='http://localhost:4040/transactions';
  const response= await fetch(url);
  return await response.json();
 }



function addNewTransaction(ev){
  // To access the http url
  ev.preventDefault(); // to prevent the default reload of onsubmit form method<form onSubmit={addNewTransaction}>]
  //  const url= process.env.REACT_APP_API_URL+'/transaction';
  const url= "http://localhost:4040/transaction";
  const price= name.split(" ")[0];
  fetch(url,{
    method:'POST',
    headers: {'Content-type':'application/json'},
    body:JSON.stringify({
      price,
      name:name.substring(price.length+1),
      datetime,
      description
    })
  }).then(response => {
    response.json().then(json =>{
      setName("");
      setDatetime("");
      setdescription("");
      console.log('result', json);
    });
  });
}
let balance=0;
for( const transaction of transactions ){
  balance=balance+transaction.price;
}
 balance= balance.toFixed(2);
 const fraction= balance.split('.')[1];
 balance=balance.split('.')[0];





return (
  <main>
    
    {toggle? <Navbar/>:<></>}

      
     <div className='rightbar'>
     <div className='bar' onClick={()=>{
       setToggle(!toggle);
     }}>
         <i className="fa fa-bars"/>
          </div>
    <h1>${balance}<span>{fraction}</span></h1>
    <form onSubmit={addNewTransaction}>
    <div className="basic">
      <input type="text" 
      value={name}
      onChange={ev => setName(ev.target.value)}
      placeholder={'+200 new samsumg phone'}/>
      <input type="datetime-local" 
      value={datetime}
      onChange={ev =>setDatetime(ev.target.value)}/>
      </div>

      <div className="description">
      <input type="text"
       value={description}
       onChange={ev =>setdescription(ev.target.value)}
       placeholder={'description'}/>
      </div>
       
       <button type="submit ">Add new description</button>
      
    </form>
   
  
   

    <div className="transactions">
      {transactions.length>0 && transactions.map(transaction=>(

     
      <div>
          <div className="transaction">
     <div className="left">
        <div className="name">{transaction.name}
        </div>
        <div className="description">
          {transaction.description}
        </div>
     </div>
     <div className="right">
      <div className={"price " + (transaction.price<0?'green':'red')}>
      

        {transaction.price}</div>
      <div className="datetime">{transaction.datetime}</div>
     </div>

    </div>
      </div>
    ))}

    { <div className="transaction">
     <div className="left">
        <div className="name">New Samsung
        </div>
        <div className="description">
          time for a new TV
        </div>
     </div>
     <div className="right">
      <div className="price red">-$500</div>
      <div className="datetime">2022-12-18 15.45</div>
     </div>

    </div> }

  </div>
    
    
    
    </div>
  </main>
);
}