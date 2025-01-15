# 🐶 Dog AI

[![Netlify Status](https://api.netlify.com/api/v1/badges/937b4244-2340-4e42-b344-c04bee2f80b3/deploy-status)](https://app.netlify.com/sites/dogai/deploys)

https://user-images.githubusercontent.com/30840709/133912996-73859a5d-dd06-4c92-a964-ba5dd2773b66.mp4

## 💡 Project

Recognize over 100 dog breeds by drag and drop an image using Tensorflow.js and Teachable Machine.

## 🛠 Tools

- [React](https://reactjs.org/)
- [React Dropzone](https://github.com/react-dropzone/react-dropzone)
- [Tensorflow.js](https://github.com/tensorflow/tfjs)
- [Teachable Machine](https://teachablemachine.withgoogle.com/)
- [Vitest](https://vitest.dev/)
- [Biome](https://biomejs.dev/)
- [React-Router v7](https://reactrouter.com/)

## 💻Demo

[https://dogai.netlify.com](https://dogai.netlify.com)

## 🚀Quick start

### Installation

```bash
$ git clone git@github.com:jeferson-sb/dogAI.git && cd dogAI
$ npm install
```

### Usage

```bash
$ npm run dev
```

### Tests

```bash
$ npm run test
```

### Linting

```bash
$ npm run lint
$ npm run format
```

### How to Train your own model

1. Gather a dataset with a bunch of images
2. Resize and minify all the images
3. Separate dogs image by breed and rename all the files
4. Upload to Teachable Machine
5. Train your model
6. Export your trained model

## Dataset Reference

Primary:
Aditya Khosla, Nityananda Jayadevaprakash, Bangpeng Yao and Li Fei-Fei. Novel dataset for Fine-Grained Image Categorization. First Workshop on Fine-Grained Visual Categorization (FGVC), IEEE Conference on Computer Vision and Pattern Recognition (CVPR), 2011.

Secondary:
J. Deng, W. Dong, R. Socher, L.-J. Li, K. Li and L. Fei-Fei, ImageNet: A Large-Scale Hierarchical Image Database. IEEE Computer Vision and Pattern Recognition (CVPR), 2009.

## 📝License

This project is licensed under the [MIT License](https://github.com/jeferson-sb/dogAI/blob/master/LICENSE)
