var pre,v1,v2,v3,v4,v5,v6,dir;
                function getBitStreamAndPlot(event, r1, ini, final, alg, side){
                        var inp=[],r2=r1.split(","),r3;
                        final=parseInt(final);
                        ini=parseInt(ini);
                        inp.push(ini);
                        for(a1=0;a1<r2.length;++a1){
                                if(r2[a1]==""){continue;}
                                r3=parseInt(r2[a1]);
                                inp.push(r3);
                        }
                        inp.push(final);
                        dir=side;
			pre=1;
                        if(alg=="fcfs"){
                                fcfs(inp, ini, final);
                        }
                        if(alg=="sstf"){
                                sstf(inp, ini, final);
                        }
                        if(alg=="scan"){
                                scan(inp, ini, final);
                        }
                        if(alg=="cscan"){
                                cscan(inp, ini, final);
                        }
                }
                
                function fcfs(inp, ini, final){
                        var x1=[];
                        var y1=[];
                        var seek=0;
                        var a1;
                        for(a1=1;a1<=inp.length;++a1){
                                x1.push(inp[a1-1]);
                                y1.push(a1);
                                if(a1==1){
                                        seek=seek+Math.abs(ini-inp[a1-1]);
                                }
                                else{
                                        seek=seek+Math.abs(inp[a1-2]-inp[a1-1]);
                                }
                        }
                
                        var layout = {
                                xaxis: {
                                        autorange: true,
                                        showgrid: true,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Sector Number'
                                },
                                yaxis: {
                                        autorange: true,
                                        showgrid: false,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Seek time'
                                }
                        };
                        var trace1 = {
                                x: x1, 
                                y: y1, 
                                type: 'scatter'
                        };
                                
                        var data = [trace1];
                        v1=seek;
                        if(pre){Plotly.newPlot('graph_area', data, layout);
                        document.getElementById("alg_seek").innerHTML = "Seek Time: "+seek;
                        document.getElementById("alg_name").innerHTML = "FCFS";
                        }
                }
                function sstf(inp, ini, final){
                        var x1=[];
                        var y1=[];
                        var seek=0;
                        var visited=[];
                        var a1,a2;
                        for(a1=0;a1<inp.length;++a1){
                                visited[a1]=0;
                        }
                        var hold=ini;
                        for(a1=1;a1<=inp.length;++a1){
                                var mn=10000;
                                var idx;
                                for(a2=0;a2<inp.length;++a2){
                                        if(visited[a2]==0){
                                                if(Math.abs(hold-inp[a2])<mn){
                                                        idx=a2;
                                                        mn=Math.abs(hold-inp[a2]);                 
                                                }
                                        }
                                }
                                seek=seek+Math.abs(hold-inp[idx]);
                                visited[idx]=1;
                                hold=inp[idx];
                                x1.push(inp[idx]);
                                y1.push(a1);
                        }
                        var layout = {
                                xaxis: {
                                        autorange: true,
                                        showgrid: true,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Sector Number'
                                },
                                yaxis: {
                                        autorange: true,
                                        showgrid: false,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Seek time'
                                }
                        };
                        var trace1 = {
                                x: x1, 
                                y: y1, 
                                type: 'scatter'
                        };
                                
                        var data = [trace1];
                        v2=seek;
                        if(pre){Plotly.newPlot('graph_area', data, layout);
                        document.getElementById("alg_seek").innerHTML = "Seek Time: "+seek;
                        document.getElementById("alg_name").innerHTML = "SSTF";
                        }
                }
                function scan(inp, ini, final){
                        var x1=[];
                        var y1=[];
                        var seek=0;
                        var visited=[];
                        var a1,a2;
                        for(a1=0;a1<inp.length;++a1){
                                visited[a1]=0;
                        }
                        inp.sort(function(a, b){return a-b});
                        var store,hold=ini;
                        for(a1=0;a1<inp.length;++a1){if(inp[a1]>=ini){store=a1;break}}
                        var count=1;
                        for(a1=store;a1<inp.length;++a1){
                                x1.push(inp[a1]);
                                y1.push(count);
                                ++count;      
                                seek=seek+Math.abs(hold-inp[a1]);
                                console.log(seek);
                                hold=inp[a1];                          
                        }
                        seek=seek+parseInt(final)-hold;
                        console.log(seek);
                        hold=final;
                        for(a1=store-1;a1>=0;--a1){
                                x1.push(inp[a1]);
                                y1.push(count);
                                ++count;
                                seek=seek+Math.abs(hold-inp[a1]);
                                console.log(seek);
                                hold=inp[a1];
                        }
                        var layout = {
                                xaxis: {
                                        autorange: true,
                                        showgrid: true,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Sector Number'
                                },
                                yaxis: {
                                        autorange: true,
                                        showgrid: false,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Seek time'
                                }
                        };
                        var trace1 = {
                                x: x1, 
                                y: y1, 
                                type: 'scatter'
                        };
                                
                        var data = [trace1];
                        v3=seek;
                        if(pre){Plotly.newPlot('graph_area', data, layout);
                        document.getElementById("alg_seek").innerHTML = "Seek Time: "+seek;
                        document.getElementById("alg_name").innerHTML = "Scan";
                        }
                }
                function cscan(inp, ini, final){
                        var x1=[];
                        var y1=[];
                        var x2=[];
                        var y2=[];
                        var x3=[];
                        var y3=[];
                        var seek=0;
                        var visited=[];
                        var a1,a2;
                        for(a1=0;a1<inp.length;++a1){
                                visited[a1]=0;
                        }
                        inp.sort(function(a, b){return a-b});
                        var store,hold=ini;
                        for(a1=0;a1<inp.length;++a1){if(inp[a1]>=ini){store=a1;break;}}
                        var count=1;
                        for(a1=store;a1<inp.length;++a1){
                                x1.push(inp[a1]);
                                y1.push(count);
                                ++count;
                                seek=seek+Math.abs(hold-inp[a1]);
                                hold=inp[a1];
                        }
                        count--;
                        x2.push(hold);
                        y2.push(count);
                        seek=seek+final-hold;
                        hold=0;
                        x2.push(0);
                        y2.push(count);
                        
                        x3.push(0);
                        y3.push(count);
                        ++count;
                        for(a1=0;a1<store;++a1){
                                x3.push(inp[a1]);
                                y3.push(count);
                                ++count;      
                                seek=seek+Math.abs(hold-inp[a1]);
                                hold=inp[a1];                          
                        }
                        var layout = {
                                xaxis: {
                                        autorange: true,
                                        showgrid: true,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Sector Number'
                                },
                                yaxis: {
                                        autorange: true,
                                        showgrid: false,
                                        zeroline: false,
                                        showline: true,
                                        autotick: true,
                                        ticks: '',
                                        showticklabels: true,
                                        title: 'Seek time'
                                }
                        };
                        var trace1 = {
                                x: x1, 
                                y: y1, 
                                type: 'scatter',
                                name: 'Forward Traversal'
                        };
                        var trace2 = {
                                x: x2, 
                                y: y2, 
                                mode: 'lines',
                                name: 'Going to 0 Sector',
                                line: {
                                        dash: 'dashdot',
                                        width: 4
                                }
                        };
                        var trace3 = {
                                x: x3, 
                                y: y3, 
                                type: 'scatter',
                                name: 'Forward Traversal'
                        };
                                
                        var data = [trace1,trace2,trace3];
                        v4=seek;
                        if(pre){Plotly.newPlot('graph_area', data, layout);
                        document.getElementById("alg_seek").innerHTML = "Seek Time: "+seek;
                        document.getElementById("alg_name").innerHTML = "C-Scan";
                        }
                }