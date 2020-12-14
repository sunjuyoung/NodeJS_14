


//사용자 로딩
async function getUser(){

}



//사용ㅈ ㅏ이름 눌렀을때 댓글 로딩
document.querySelectorAll('#user-list tr').forEach((el)=>{
    el.addEventListener('click',function(){
       const id = el.querySelector('td').textContent;
        getComment(id);
      
    })
})

//댓글 로딩
async function getComment(id){
    try{
        const res = await axios.get(`/users/${id}/comments`);
        const comments = res.data;
        console.log(comments);
        console.log('hi');
        const tbody = document.querySelector('#comment-list tbody');
        tbody.innerHTML='';
        comments.map((comment)=>{
            //목록추가
            const row = document.createElement('tr');

            let td = document.createElement('td');
            td.textContent = comment.id;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = comment.User.name;
            row.appendChild(td);

            td = document.createElement('td');
            td.textContent = comment.comment;
            row.appendChild(td);
            //수정 버튼 생성
            const edit = document.createElement('button');
            td = document.createElement('td');
            edit.textContent="수정";
            td.appendChild(edit);
            row.appendChild(td);

            //삭제 버튼 생성
            const remove = document.createElement('button');
            td = document.createElement('td');
            remove.textContent="삭제";
            td.appendChild(remove);
            row.appendChild(td);

            tbody.appendChild(row);

            //수정 버튼 클릭시
            edit.addEventListener('click',function(){
                console.log('수정');
            })

            //삭제 버튼 클릭
            remove.addEventListener('click',async function(){
                console.log('삭제');
                try{
                    await axios.delete(`/comments/${comment.id}`);
                    getComment(id);
                }catch(err){

                }
            })

        })

    }catch(err){
        console.error(err);
    }
}


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

//댓글 등록
document.getElementById('comment-form').addEventListener('submit',async (e)=>{
    e.preventDefault();

    const id = e.target.userid.value;
    const comment = e.target.comment.value;

    try{
        await axios.post('/comments',)
    }catch(err){

    }

})