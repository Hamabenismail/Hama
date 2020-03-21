import { Component,OnInit,ViewChild } from '@angular/core';

declare var peer:any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
 
  @ViewChild('myvideo',{static:true}) myVideo: any ;
  myId = 'chatroom';
  anotherId=''
  peer;
  constructor(){


  }
  ngOnInit(){
    let video=this.myVideo.nativeElement;
     this.peer=new Peer();
     setTimeout(() => {
       console.log(this.peer.id);
       this.myId=this.peer.id
     }, 3000);
     this.peer.on('connection', function(conn) { 
      conn.on('data',function(data){
        console.log(data);
      })
     });
     var m= <any>navigator
     m.getUserMedia=m.getUserMedia || m.webkitGetUserMedia || m.mozGetUserMedia;
     this.peer.on('call', function(call){
       m.getUserMedia({video:true,audio:true},function(stream){
         call.answer(stream,function(remotestream){
           video.srcObject=remotestream
           video.play();
         });
       },function(error){
        console.log('failed to get stream');
      })
     })
  }
  connect(){
    var conn = this.peer.connect(this.anotherId);
    conn.on('open', function() {
      // Send messages
      conn.send('Hello!');
    });
  }
  
  videoConnect(){
    let video=this.myVideo.nativeElement;
    var localvar=this.peer;
    var frame=this.anotherId;
    var m= <any>navigator
    m.getUserMedia=m.getUserMedia || m.webkitGetUserMedia || m.mozGetUserMedia;
    m.getUserMedia({video:true,audio:false},function(stream){
      var call=localvar.call(frame,stream)
      call.on('stream',function(remotestream){
        video.srcObject=remotestream;
        video.play();
      })
    },function(error){
      console.log('failed to get stream');
    })
  }
 
}
