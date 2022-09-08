export default () => ({
  signin: (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let json = {
          error: '',
          token: '23904',
        };

        resolve(json);
      }, 1000);
    })
  },
  signup: (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let json = {
          error: '',
          token: '',
        };

        if (email == 'error@hotmail.com') {
          json.error = 'E-mail já existente!';
        } else {
          json.token = '20392390';
        }

        resolve(json);
      }, 1000);
    })
  },
  findDriver: options => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let json = {
          error: '',
        };

        json.driver = {
          name: 'Joseph Aldo',
          avatar: 'https://www.estudandoadistancia.com.br/wp-content/uploads/2018/01/motorista-atendimento.jpg',
          stars: 4,
          carName: 'Honda Civic',
          carColor: 'Branco',
          carPlate: 'AAA-0000',
        };
        resolve(json);
      }, 3000);
    });
  },
  setRating: rating => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let json = {
          error: '',
        };

        resolve(json);
      }, 1000);
    });
  },
  getRequestPrice: (distance) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let json = {
          error: ''
        };

        json.price = distance * 7;

        resolve(json);
      }, 1000);
    });
  },
});
