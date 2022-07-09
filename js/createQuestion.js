class createExc{
	q;a;numA;numQ;finalExc=[];

	constructor(){
		pan.innerHTML=`<p>This is where you can create Excersises</p>
	  <div class="lineMargin" m="50px"></div>

	  <div class="askPan flex c">
	    <input class="clickable" id="excName" placeholder="Name of Excersise or Chapter">
	    <div class="lineMargin" m="30px" h="1px" w="200px" ></div>
	    <textarea class="clickable" id="getQ" placeholder="QUESTIONS: Paste here..."></textarea>
	    <div class="lineMargin" m="30px" h="1px" w="200px" ></div>
	    <textarea class="clickable" id="getA" placeholder="ANSWER: Paste here..."></textarea>

	    <div class="lineMargin" m="30px" h="1px" w="100px" ></div>
	    <button class="clickable" id="createQ" onclick="createE.createQ()">Create Excersise</button>
	  </div>`;
	  pan.className="pan createPan";
	  log(this)

	  resetFormat();
	}

	saveExc(){
		var prevData=localStorage.getItem("excersises") || "[]" ;
		prevData=JSON.parse(prevData);
		var tmpObj={name:excName.value||new Date().toDateString(),created:new Date().toDateString(),data:this.finalExc}
		log(tmpObj,prevData)
		prevData.push(tmpObj);
		localStorage.excersises=JSON.stringify(prevData);
	}

	arrangeQ(){
		this.finalExc=[];
		for(let i=0; i<this.q.length; i++){
			var question=this.q[i];
			var answer=this.a[i];
			if(answer){
				var qu=question.replace(/\n\(\d\)\s/,"~~~~Q~~~~"),opts,ans,desc="";
				qu=qu.split("~~~~Q~~~~");
				opts=this.sepOpt(qu[1]);
				qu=qu[0];

				ans=answer.charAt(answer.search(/\d/));
				desc=answer.replace(/\(\d\)\s/,"");

				var obj={
					qu,opts,ans,desc
				}
				this.finalExc.push(obj)
			}
		}

		this.saveExc();
	}

	sepOpt(str=''){
	  var ary=[],found=1,temp="",prev="";
	  for(let val of str){
	    if(prev=="(" && val== found+1){
	      ary.push(temp);
	      temp="";prev="";found++;
	    }
	    temp+=prev;
	    prev=val;
	  }
	  ary.push(temp+prev);
	  ary=ary.map(val=>{
	    return val.replace(/\d\)\s/,"");
	  })
	  return ary;
	}

	createQ(){
		this.q=getQ.value;
		this.a=getA.value;

		this.q=this.q.replace(/.*?\d\./,"");
		this.a=this.a.replace(/.*?\d\./,"");
		
		this.q=this.q.split(/\n[0-9].*?\s/);
		this.a=this.a.replaceAll(/(\d|\d\d|\d\d\d)\.\s/g,"~~~s~~~");
		this.a=this.a.split("~~~s~~~");

		this.numQ=this.q.length;this.numA=this.a.length;

		if(confirm(Math.min(this.numA,this.numQ)+" Questions only detected")){
			this.arrangeQ();
		}
	}

}
var createE;
function startCreate(){
	createE=new createExc();
}
