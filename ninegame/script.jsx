// Code goes here

console.log("testa");

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};


var StarsFrame = React.createClass({
  render: function(){
    
    
    var stars = [];
    
    for(var i=0; i<this.props.numberOfStars; i++){
      stars.push(
        <span className="glyphicon glyphicon-star"></span>
      );
    }
    
    return (
      <div id="stars-frame" >
        <div className="well">
          {stars}
          
        </div>
      </div>
    )
  }
});

var ButtonFrame = React.createClass({
  render: function(){
    var disabled, button, correct = this.props.correct;
    
    switch(correct){
      case true:
        button = (
          <button className="btn btn-success btn-lg" onClick={this.props.acceptAnswer} >
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        );
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg">
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        );
        break;
      default:
        disabled = (this.props.selectedNumbers.length === 0);
        button = (
          <button className="btn btn-primary btn-lg" disabled={disabled} onClick={this.props.checkAnswer}>=</button>
        );
    }
    
    
    return (
      <div id="button-frame" >
        {button}
        <br />
        <br />
        
        <button className="btn btn-warning btn-xs" onClick={this.props.redraw} disabled={this.props.redraws === 0}>
          <span className="glyphicon glyphicon-refresh"></span>
          &nbsp;
          {this.props.redraws}
        </button>
      </div>
    )
  }
});



var AnswerFrame = React.createClass({
  render: function(){
    
    
    var unSelectNumber = this.props.unSelectNumber;
    var selectedNumbers = this.props.selectedNumbers.map(function(i){
      return (
        <span onClick={unSelectNumber.bind(null, i)} > {i} </span>
      )
    });
    
    return (
      <div id="answer-frame" >
        <div className="well" >
          {selectedNumbers}
        </div>
      </div>
    )
  }
});

var NumbersFrame = React.createClass({
  render: function(){
    
    var numbers = [], className, 
        selectNumber = this.props.selectNumber,
        usedNumbers = this.props.usedNumbers,
        selectedNumbers = this.props.selectedNumbers;
    console.log('clicknum', selectNumber);    
    for(var i=1; i <= 9; i++){
      className = "number selected-" + (selectedNumbers.indexOf(i) >= 0);
      className += " used-" + (usedNumbers.indexOf(i) >= 0);
      numbers.push(
        <div className={className} onClick={selectNumber.bind(null, i)} >{i}</div>
      )
    }
    
    return (
      <div id="numbers-frame" >
        <div className="well">
          
          {numbers}
        </div>
      </div>
    )
  }
});

var DoneFrame = React.createClass({
  render: function(){
    return(
      <div id="done-frame" className="well text-center">
        <h2>{this.props.doneStatus}</h2>
        <button className="btn btn-default" onClick={this.props.resetGame}>Play Again</button>
      </div>
    )
  }
});
var Game = React.createClass({
  getInitialState: function(){
    return {  numberOfStars: this.randomNumber() , 
              selectedNumbers: [], 
              usedNumbers: [],
              redraws: 5,
              doneStatus: null,
              correct: null };
  },
  
  resetGame: function(){
    this.replaceState(this.getInitialState());
  },
  randomNumber: function(){
    return Math.floor(Math.random()*9) + 1;
  },
  selectNumber: function(clickedNumber){
    console.log("someone click", clickedNumber);
    if(this.state.selectedNumbers.indexOf(clickedNumber) < 0){
      this.setState(
        {selectedNumbers: this.state.selectedNumbers.concat(clickedNumber), correct: null }
      );
    }
  },
  
  unSelectNumber: function(clickedNumber){
    var selectedNumbers = this.state.selectedNumbers,
        indexOfNumber = selectedNumbers.indexOf(clickedNumber);
    
    selectedNumbers.splice(indexOfNumber, 1);
    this.setState(
      {selectedNumbers: selectedNumbers, correct: null}
    );
  },
  
  sumOfSelectedNumbers: function(){
    return this.state.selectedNumbers.reduce(function(p,n){
      return p+n;
    }, 0);
  },
  
  checkAnswer: function(){
    console.log("awa ang ans: ",this.state.numberOfStars, this.sumOfSelectedNumbers()) ;
    var correct = (this.state.numberOfStars === this.sumOfSelectedNumbers());
  
    this.setState({correct: correct});
  },
  
  acceptAnswer: function(){
    var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    this.setState({
      selectedNumbers: [],
      correct: null,
      usedNumbers: usedNumbers,
      numberOfStars: this.randomNumber()
      
    }, function(){
      this.updateDoneStatus();
    });
    
  },
  redraw: function(){
    if(this.state.redraws > 0 ){
      this.setState({
        numberOfStars: this.randomNumber(),
        correct: null,
        selectedNumbers: [],
        redraws: this.state.redraws - 1
      }, function(){
        this.updateDoneStatus();
      });
    }
    
  },
  
  possibleSolutions: function(){
    var numberOfStars = this.state.numberOfStars,
      possibleNumbers = [],
        usedNumbers = this.state.usedNumbers;
        
    for(var i=1; i<=9; i++){
      if(usedNumbers.indexOf(i) < 0){
        possibleNumbers.push(i);
      }
    }
    console.log("awa daw", numberOfStars);
    // return true;
    console.log("possible", possibleCombinationSum(possibleNumbers, numberOfStars));
    return possibleCombinationSum(possibleNumbers, numberOfStars);
    
  },
  
  updateDoneStatus: function(){
    if(this.state.usedNumbers.length === 9){
      this.setState({doneStatus: 'Done. Nice!'});
      return;
    }
    
    if(this.state.redraws === 0 && !this.possibleSolutions()){
      this.setState({doneStatus: 'Game Over'});
      return;
    }
  },
  
  render: function(){
    var numberOfStars = this.state.numberOfStars,
        selectedNumbers = this.state.selectedNumbers,
        usedNumbers = this.state.usedNumbers,
        correct = this.state.correct, 
        doneStatus = this.state.doneStatus,
        redraws = this.state.redraws,
        bottomFrame;
        
    if(doneStatus){
      bottomFrame = <DoneFrame doneStatus={doneStatus} resetGame={this.resetGame} />
    }else{
      bottomFrame = <NumbersFrame selectedNumbers={selectedNumbers} 
                      selectNumber={this.selectNumber} 
                      usedNumbers={usedNumbers} />
    }
        
    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr/>
        <div className="clearfix">
          <StarsFrame numberOfStars={numberOfStars} />
          
          <ButtonFrame selectedNumbers={selectedNumbers} 
                      correct={correct} 
                      checkAnswer={this.checkAnswer} 
                      acceptAnswer={this.acceptAnswer}
                      redraw={this.redraw}
                      redraws={redraws} />
                      
          <AnswerFrame selectedNumbers={selectedNumbers} 
                      unSelectNumber={this.unSelectNumber} />
        </div>
        
        {bottomFrame}              
        
      </div>
    )
  }
});


ReactDOM.render(
  <Game />,
  document.getElementById('container')
);