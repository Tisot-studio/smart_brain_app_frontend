import { Component } from 'react';
import './App.css';
import Navigation from './components/navigation/Navigation';
import Logo from './components/logo/Logo';
import ImageForm from './components/form/ImageForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';


// Добавляем свой API Key
const app = new Clarifai.App({
 apiKey: 'TOKEN'
});

// парметры для particles.js
const particlesOptions = {
  particles: {
    line_linked: {
      shadow: {
        enable: true,
        color: "#3CA9D1",
        blur: 10
      }
    }
  }
}

class App extends Component {
  // Добавляем данные которые будут обновляться 
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin'
    }
  }


  // Функция вычисления рамки вокруг лица. 
  // 1. Принимаем аргумент в виде данных с API
  // 2. Захватываем изображение через DOM
  // 3. Определяем ширину и высоту изображения
  // 4. Выводим объект содержащий данные для построения рамки, т.к. API присылает процентное соотношение к изображению,
  // вычисляем каждую сторону 
  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage')
    const width = Number(image.width)
    const height = Number(image.height)
    return { 
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }


  // Функция принимает результаты вычислений сторон рамки и помещает их в объект box в state
  displayFaceBox = (box) => {
    this.setState({box: box})
  }



// Функция для обновления обьекта state, в input загружается то, что введено в фрому
  onImputChange = (event) =>{
      this.setState({input: event.target.value})
  }

  // Функция для обновления imageURL, при нажатии на кнопку значение input загружается в значение imageURL,
  // а это значение является источником изображения, которое отобразится под формой
  // Затем происходит звонок на API, туда отправляются данные из input, 
  // в ответ присылается обект с нужными нам значениями, на их основе будет создаваться рамка вокруг лица
  onSubmit = (event) =>{
    this.setState({imageURL: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(response => {
      this.displayFaceBox(this.calculateFaceLocation(response))})   
    .catch(error => console.log(error))
  }

  // Функция для отображения форм входа/регистрации
  onRouteChange = (route) => {
    this.setState({route: route})
  }

  render(){
    const {box, imageURL, route} = this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particlesOptions} />
       {route === 'home'                    // Отобразить основную страницу
       ?<div>
       <Navigation onRouteChange={this.onRouteChange}/>
      <Logo />
      <ImageForm onImputChange={this.onImputChange} onSubmit={this.onSubmit}/>
      <FaceRecognition box={box} imageURL={imageURL}/>
      </div>
       : (route === 'signin'               // Отобразить форму для входа, либо для регистрации
       ?<Signin onRouteChange={this.onRouteChange} />
       :<Register onRouteChange={this.onRouteChange} />)
       }
      </div>
    );
  }
}
export default App;
