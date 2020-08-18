//사용자 등록시
document.getElementById('user-form').addEventListener('submit',async (e)=>{
    e.preventDefault();
    const name = e.target.username.value;
    const age = e.target.age.value;
    const married = e.target.married.checked;
    if(!name){
        return alert('이름을 입력하세요');
    }   
    if(!age){
        return alert('나이을 입력하세요');
    }
    try{
        await axios.post('/users',{name,age,married});
    }catch(err){
        console.error(err);
    }

    e.target.username.value='';
    e.target.age.value='';
    e.target.married.checked=false;
  
})