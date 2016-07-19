// ReactDOM.render(
//   <h1>Hello, world!</h1>,
//   document.getElementById('container')
// );



var Booka = React.createClass({
	propTypes:{
		title: React.PropTypes.string.isRequired
	},
	handleClick: function(){
		this.props.onBookSelected(this.props.title);
	},
	render: function(){
		return (
				<div className="answer" onClick={this.handleClick}>{this.props.title}</div>
			)
	}
});

var data = [
	{
		name: 'Mark Twain',
		imageURL: 'images/marktwain.jpg',
		books:['The Adventures of Huckleberry Finn']
	},
	{
		name: 'Joseph Conrad',
		imageURL: 'images/josephconrad.jpg',
		books:['Heart of Darkness']
	},
	{
		name: 'J.K Rowling',
		imageURL: 'images/jkrowling.jpg',
		books:['Harry Potter']
	},
	{
		name: 'Stephen King',
		imageURL: 'images/stephenking.jpg',
		books:['The Shining', 'IT']
	},
	{
		name: 'Charles Dickens',
		imageURL: 'images/charlesdickens.jpg',
		books:['David Cooperfield', 'A Tale of Two Cities']
	},
	{
		name: 'William Shakespeare',
		imageURL: 'images/willianshakespeare.jpg',
		books:['Hamlet', 'Macbeth', 'Romeo and Juliet']
	}
];

data.selectGame = function(){
	var books = _.shuffle(this.reduce(function(p, c, i){
		return p.concat(c.books);
	}, [])).slice(0,4);

	console.log("books", books);

	var answer = books[_.random(books.length - 1)];
	console.log("answer", answer);
	var author = _.find(this, function(author){
		return author.books.some(function(title){
			return title === answer;
		});
	});

	var checkAnswer = function(title){
		return this.author.books.some(function(t){
			return t === title;
		});
	}
	console.log("author", author); 
	return {
		books: books,
		author: author,
		checkAnswer: checkAnswer
	}
	
}
// data.selectGame();
var Quiz = React.createClass({

	// propTypes: {
	//     books: React.PropTypes.array.isRequired
	// },
	getInitialState: function() {
	    return _.extend({
	    	bgClass: 'neutral',
	    	showContinue: false,
	    }, this.props.data.selectGame()); 
	    
	},
	handleBookSelected: function(title){
		var isCorrect = this.state.checkAnswer(title);
		this.setState({
			bgClass: isCorrect ? 'pass': 'fail',
			showContinue: isCorrect 
		});
	},
	handleContinue: function(){
		console.log("continue");
		this.setState(this.getInitialState());
	},
	render: function(){
		// var allBooks =['Lord of the rings', 'The illiad'];
		var books = this.state.books.map(function(book, i){
			return(
				<Booka title={book} onBookSelected={this.handleBookSelected} key={i}/>
			);
		}, this);

		return (
			<div>
				<div className="row">
					<div className="col-md-4">
						
						<img src={this.state.author.imageURL} width="200" />
					</div>
					<div className="col-md-7">
						{books}
					</div>
					<div className="col-md-1">
						{this.state.bgClass}
					</div>
				</div>
				{this.state.showContinue ? (
					<button onClick={this.handleContinue} >Continue</button>
					): (<span> Cant Continue </span>)
			}

			</div>
		);
	}
	// allBooks: function(){
	// 	return ['Lord of the rings', 'The illiad'];
	// },
	// render: function(){
	// 	return (
	// 		<div>{this.props.books}</div>
	// 	)
	// }
});


ReactDOM.render(
	<Quiz  data={data}/>,
	document.getElementById('container')
);