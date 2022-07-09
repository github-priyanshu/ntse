class Practise{
allData;html="";

constructor(){
	this.allData=JSON.parse(localStorage.getItem("excersises"))||null;
	(this.allData)?this.createList():this.showNothing();
	
	pan.className="flex c pan practise";



	resetFormat();
}

createList(){
	this.makeFrameHTML();
	this.html+="<div class='body w100p'>";
	for(let i=0; i<this.allData.length; i++){
		var val=this.allData[i];
		this.html+=`<div class="w100p sb flex c chName">
			<div class="info flex w100p clickable sb" onclick="practise.activateMe(this);">
				<div class="name">${val.name}</div>
				<div class="date" fs=".8em" col="#fff8">${val.created}</div>
			</div>

			<div class="onActive flex c w100p">
				<div class="w100p sb">
					<label class="optsStart flex sb"><p>Start-End</p><input type="radio" name="r" value="0" checked></label>
					<label class="optsStart flex sb"><p>End-Start</p><input type="radio" name="r" value="practise.currentTest.data.length-1"></label>
					<label class="optsStart flex sb"><p>Random</p><input type="radio" name="r" value="Math.floor(Math.random()*practise.currentTest.data.length)"></label>
				</div>
				<button class="clickable" onclick="practise.startTest(${i})">Start</button>
			</div>
		</div>`
	}
	this.html+="</div>";

	pan.innerHTML=this.html;
	log("..creating list")

}

optClicked(opt){
	var passed=opt==this.qData.ans;
	var col=(passed)?"#0f0":"#f00";

	var html=(this.qData.desc!="")?`
		<div class="w100p ansPan">
			<p col="#ddd" fs=".9em">Hint & Explanations</p>
			<div class="lineMargin" m="10px"></div>
			<div class="desc" col="${col}">${this.qData.desc}</div>
		</div>`:"";

	html+=`<button class="clickable nextBtn" onclick="practise.setQuestion()" style="--col: ${col}">Next</button>`;

	qList.insertAdjacentHTML("beforeend",html);
	resetFormat();

	var opts=opp(".opt");
	if(!passed){
		opts.forEach(val=>{
			val.style.borderColor="#f00";
		})
	}
	opts[this.qData.ans-1].style.borderColor="#0f0";
}

setQuestion(){
	var qData=this.currentTest.data.splice(eval(this.testType),1)[0],optHtml="";
	this.qData=qData;
	log(qData);

	qData.opts.map((val,n)=>{
		optHtml+=`<div class="opt clickable" onclick="practise.optClicked(${n+1})">${val}</div>`;
	})

	var html=`
	<div class="quPan">
		<p>${qData.qu.replaceAll("\n","<br>")}</p>
		<div class="lineMargin" m="30px"></div>
		<div class="optPan">
		${optHtml}
		</div>
	</div>
	`;
	log(html);
	qList.innerHTML=html;
	resetFormat();
}

startTest(i){
	this.testType=op("input:checked[name=r]").value;
	this.currentTest=this.allData[i];
	pan.innerHTML=`<div id="qList"></div>`;
	this.setQuestion();
}

activateMe(elem){
	elem.parentElement.classList.toggle("active");
}

makeFrameHTML(){
	this.html=`
	<div class="flex sb w100p head">
		<div>Excersises</div>
		<div class="srhPan">
			<input class="clickable" id="search" placeholder="Search">
		</div>
	</div>
	<div class="lineMargin" m="30px" h="1px" w="200px" style="margin: 30px; height: 1px; width: 200px;"></div>
	`;
}

showNothing(){
	pan.innerHTML="No excersises you have created and becoming oversmart. First create it."
}

}
var practise;
function startPractise(){
	practise=new Practise();

}
startPractise();
