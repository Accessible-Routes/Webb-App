import './App.css';

function App() {
  return (
    <div>
      <h1>Welcome to my app</h1>
      <MyButton />
      <AboutPage />
      <UserName/>
      <Avatar/>
    </div>
    
  );
}
var user = {name:"Julian", lastName:"PS", age:20, eyeColor:"brown",imgurl:"https://thumbor.bigedition.com/full-sphynx/5Uhxw7bOSOy1ys2vaBVRpNQ8ROs=/65x0:894x621/800x600/filters:format(webp):quality(80)/granite-web-prod/7c/97/7c978d13f86e47b39a1dfc081a6a0fca.jpeg"};
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}
function UserName(){
  return (
    <h1>
      {user.name}
    </h1>
  );
}
function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <p>Hello there.<br />How do you do?</p>
    </>
  );
}
function Avatar(){
  return (
    <img
      className="avatar"
      src={user.imgurl}
      alt="cat"
    />
  );
}


export default App;
