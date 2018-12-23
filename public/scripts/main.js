//Dummy JS as example to work with on Gulp.js

class Person {
    constructor(name) {
        this.name = name;
    }

    hello() {
        if(typeof this.name === 'string'){
            return `Hello, I am ${this.name}`;

        }else{
            return 'Hello';
        }
    }
}

let person = new Person('Eric Border');

document.write(person.hello());
