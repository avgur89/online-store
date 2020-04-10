const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

class Course {
  constructor(title, price, imgUrl) {
    this.title = title;
    this.price = price;
    this.imgUrl = imgUrl;
    this.id = uuid.v4();
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        'utf-8',
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(data));
          }
        }
      );
    });
  }

  static async getCourseById(id) {
    const courses = await Course.getAll();

    return courses.find((course) => course.id === id);
  }

  static async update(course) {
    const courses = await Course.getAll();

    const idx = courses.findIndex((c) => c.id === course.id);
    courses[idx] = course;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }

  async save() {
    const courses = await Course.getAll();

    courses.push({
      title: this.title,
      price: this.price,
      imgUrl: this.imgUrl,
      id: this.id,
    });

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });
  }
}

module.exports = Course;
