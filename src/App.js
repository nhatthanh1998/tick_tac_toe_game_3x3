import React, {Component} from 'react';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      win:null,
      turn:"x",
      values:[['','',''],['','',''],['','','']],
      count : 0,
      play_able:true,
      title:null
    }
  }
  generate_title(){
    if(this.state.win === "x"){
      this.setState({
        play_able:false,
        title:"x"
      })
    }if(this.state.win === "y"){
      this.setState({
        play_able:false,
        title:"y"
      })
    }
    if(this.state.win === "draw"){
      this.setState({
        play_able:false,
        title:"draw"
      })
    }
  }

  check_win(){
    //kiểm tra người chiến thắng sau mỗi lược chơi
    var result = this.state.values
    if(result[0][0] === result[1][1] && result[1][1]=== result[2][2] && result[0][0].length>0){
      this.setState({
        win:result[0][0]
      })
      return 
    }
    if(result[2][0] === result[1][1] && result[1][1] === result[0][2] && result[2][0].length>0){
      this.setState({
        win:result[2][0]
      })
      return
    }
    if(this.state.count === 9){
      this.setState({
        win:"draw"
      })
      return
    }
    if(this.state.count === 9 ){
      this.setState({
        win:"draw"
      })
      return 
    }
    for(var i = 0;i < 3;i++){
      if(result[i][0] === result[i][1] && result[i][1]===result[i][2] && result[i][0].length>0){
        this.setState({
          win:result[i][0]
        })
        break
      }
      if(result[0][i] === result[1][i] && result[0][i] ===result[2][i] && result[0][i].length>0){
        this.setState({
          win:result[0][i]
        })
        return
      }
    }
  }



  //xoay vòng lượt chơi của x và y
  handle_play(){
    if(this.state.turn === "x"){
      this.setState({
        turn:"y",
        count :this.state.count + 1
      })
    }else{
      this.setState({
        turn:"x",
        count:this.state.count + 1
      })
    }
  }

  render_title(){
    if(this.state.title === "x"){
      return <span style={{color:"red"}}><i class="fas fa-times"></i> WIN THE GAME!</span>
    }
    if(this.state.title === "y"){
      return <span style={{color:"blue"}}><i class="fas fa-circle-notch"></i> WIN THE GAME!</span>
    }
    if(this.state.title === "draw"){
      return <span><i class="fas fa-times" style={{color:"red"}}></i> <i class="fas fa-circle-notch" style={{color:"blue"}}></i>  GAME DRAW</span>
    }
  }



  //render kết quả của ô chơi hiện lên màn hình
  render_col(r,c){
    if(this.state.values[r][c]==="x"){
        return<div style={{color:"red"}}><i class="fas fa-times"></i></div>
    }if(this.state.values[r][c]==="y"){
      return<div style={{color:"blue"}}><i class="fas fa-circle-notch"></i></div>
    }
  }


  //render ra khung trò chơi 3x3 
  render_board() {
    var board = [
      [
        {r:0,c:0},{r:0,c:1},{r:0,c:2}
      ],
      [
        {r:1,c:0},{r:1,c:1},{r:1,c:2}
      ],[
      {r:2,c:0},{r:2,c:1},{r:2,c:2}
    ]
  ]
    return board.map(row => {
      return row.map(col => {
        return <div
          className="col-4"
          style={{
          border: ".2px solid black",
          textAlign:"center",
          fontSize:"100px",
          width:"200px",
          height:"200px",
          background:"white"
        }}
          onClick = {async ()=>{

            //xử lý khi người chơi thao tác với ô chơi

            var updated_board = this.state.values

            //ghi kết quả chơi vào table --> this.state.values
            if(updated_board[col.r][col.c].length === 0 && this.state.play_able === true){
              if(this.state.turn === "x"){
                updated_board[col.r][col.c] = "x"
              }else{
                updated_board[col.r][col.c] = "y"
              }
              this.setState({
                values:updated_board
              })
              await this.handle_play()
              await this.check_win()
              await this.generate_title()
            }
          }}
        >{this.render_col(col.r,col.c)}</div>
      })
    })
  }

  render() {
    
    return (
      <div style={{width:"100%",minHeight:"100vh",background:"#bbdefb"}}>
      <div className="container pt-5" style={{textAlign:"center"}}>
      <span style={{fontSize:"50px"}}>Tick Tac Toe Game <i class="fas fa-gamepad"></i></span>
        <div className="row pt-5">
          <div className="col"/>
          <div className="col-8">
            <div className="row" style={{height:"600px",width:"100%"}}>
              {this.render_board()}
            </div>
            <div className="row mt-5">
          <div className="col" style={{textAlign:"center",fontSize:"50px",width:"600px"}}>{this.render_title()}</div>
        </div>
        <div className="row mt-3">
        <div className="btn btn-dark w-100" style={{fontSize:"20px"}} onClick={()=>{
          this.setState({
            win:null,
            turn:"x",
            values:[['','',''],['','',''],['','','']],
            count : 0,
            play_able:true,
            title:null
          })
        }}><i class="fas fa-gamepad"></i> Reset game!</div>
        </div>
          </div>
          <div className="col"/>
        </div>
      </div>
      </div>
    );
  }
}

export default App;
