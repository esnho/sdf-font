import { demoTinySDF } from './demoTinySDF';
import { initTroikaDemo } from './demoTroikaText';

function addTitle(title) {
  const h1 = document.createElement('h1');
  h1.innerText = title;
  document.body.appendChild(h1);
}

document.body.style.backgroundColor = 'gray';
addTitle('Tiny SDF');
demoTinySDF();
addTitle('Troika + ThreeJS');
initTroikaDemo();
