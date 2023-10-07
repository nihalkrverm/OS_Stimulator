var memory = [];
var filled = [];
var row = {
	start: "",
	end: "",
	size: ""
};
var total_mem;

//document.getElementById("output").innerHTML = "Test";


var submitBtn = document.querySelector('#submit-btn');
submitBtn.onclick = getInitValues;

function getInitValues() {
	total_mem = document.querySelector('#tm').value;

	var message = 'Total memory: ' + total_mem;
	render(message, document.querySelector('#output'));
	
	var i = 0;
	//initializing memory
	for(i = 0; i < total_mem; i++)
		memory[i] = -1;

	var requestBtn = document.querySelector('#allocate-btn');
	requestBtn.onclick = findHole;  //fn for allocating

	var removeBtn = document.querySelector('#deallocate-btn');
	removeBtn.onclick = removeBlock;    //fn for deallocating
    function findHole() {
        var requestsize = document.querySelector('#process-size').value;
        var requestid = document.querySelector('#process-id-input').value;
        var i;
        var alloc = 0;
        for(i = 0; i < total_mem; i++) {
            if(memory[i] != -1) {
                continue;
            }
            else {
                flag = 0;
                for(j = i; j < parseInt(requestsize) + parseInt(i); j++) {
                    if(memory[j] != -1) {
                        flag++;
                        i = j;
                        break;
                    }
                }
                if(!flag) {
                    //allocating from i onwards
                    limit = parseInt(i) + parseInt(requestsize);
                    for(j = i; j < limit; j++)
                        memory[j] = requestid;
                    //updating table
                    var row = {
                        id: requestid,
                        start: i,
                        end: limit,
                        size: requestsize,
                    };
                    filled.push(row);
                    alloc = 1;
                    render("Addresses " + row["start"] + " to " + row["end"] + " allocated to process " + requestid, document.querySelector('#output'));
                }
            }
            if(alloc)
                break;
        }
        if(alloc == 0)
            render("Could not allocate memory", document.querySelector('#output'));
        console.log(filled);
    }

	function removeBlock() {
		var remove = document.querySelector('#process-id-dealloc').value;
		var found = 0;
		for( var i = filled.length-1; i >= 0; i--) {
			if(filled[i]["id"] == remove) {
				found++;
				var start = parseInt(filled[i]["start"]);
				var end = parseInt(filled[i]["end"]);
				filled.splice(i, 1);
				break;
			}
		}
		if(found)
			render("Addresses " + start + " to " + end + " freed", document.querySelector('#output'));
		else
			render("Error: Process not found in memory", document.querySelector('#output'));
		for(var i = start; i < end; i++)
			memory[i] = -1;
	}
}

function render (template, node) {
	if(!node)
		return;
	node.innerHTML = template;
}