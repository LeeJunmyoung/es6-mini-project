class Blog {
	constructor() {
		//const dataURL = "https://tlhm20eugk.execute-api.ap-northeast-2.amazonaws.com/prod/lambda_get_blog_info";
    this.setInitVariable();
		this.registerEvents();
    this.likedSet = new Set();
    console.log(this.likedSet);
	}
  setInitVariable(){
    this.blogList =  document.querySelector(".blogList > ul");
  }


  registerEvents(){
    const dataURL = "/data/data.json";
    const startBtn = document.querySelector(".start");
    const blogList = this.blogList;
    let count =0;



    startBtn.addEventListener("click",()=>{
      if(count==0){
      this.setInitData(dataURL);
      count++;
      }
    });
    blogList.addEventListener("click",({target})=>{
      const targetClassName = target.className;
      if(targetClassName==='like'){
        const title = target.previousElementSibling.textContent
        this.likedSet.add(title);
        console.log(this.likedSet);
      }else{
        return;
      }
    });
  }

	setInitData(dataURL) {
		this.getData(dataURL, this.insertPosts.bind(this));
	}

	getData(dataURL, fn) {
		const oReq = new XMLHttpRequest();
		oReq.addEventListener("load", () => {

			//const list = JSON.parse(JSON.parse(oReq.responseText).body);
      const list = JSON.parse(oReq.responseText).body;
			fn(list);
		});
		oReq.open('GET', dataURL);
		oReq.send();


	}

	insertPosts(list) {
	//	const ul = document.querySelector(".blogList > ul");
		list.forEach((v) => {
			this.blogList.innerHTML +=
      `<li>
          <a href=${v.link}> ${v.title} </a>
          <div class='like'>찜하기</div>
       </li>`;
		})
	}
}

export default Blog;
