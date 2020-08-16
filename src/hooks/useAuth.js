const useAuth = () => {

  const signin = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const json = {
          error: '',
        }

        if(email === 'erro@email.com') {
          json.error = 'E-mail ou senha inválidos!';
        }else {
          json.token = '123';
        }

        resolve(json);
      }, 2000);
    });
  }

  const signup = (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const json = {
          error: '',
        }

        if(email === 'erro@email.com') {
          json.error = 'E-mail já existe!';
        }else {
          json.token = '123';
        }

        resolve(json);
      }, 2000);
    });
  }

  return {
    signin,
    signup,
  }
}

export default useAuth;
