import _ from "lodash";
import "./style.css";
import Icon from "./header.png";
import Data from "./data.xml";

function component() {
    var element = document.createElement('div');

    //loash, now imported by this script

    element.innerHTML = _.join(['Hello', 'webpack'], '');
    element.classList.add('hello'); //classList.add 添加指定的类值

    // 将图像添加到现有的div中

    var myIcon = new Image();
    myIcon.src = Icon;

    element.appendChild(myIcon);

    console.log(Data);

    return element;
}

document.body.appendChild(component());
