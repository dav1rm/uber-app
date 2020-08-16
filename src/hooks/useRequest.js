const useRequest = () => {
  const getPrice = (distance, duration) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const json = {
          error: '',
        }

        if(distance < 0 || duration < 0) {
          json.error = 'Problema ao obter preço da corrida!';
        }else {
          json.price = distance * 4.5;
        }

        resolve(json);
      }, 2000);
    });
  }

  return {
    getPrice,
  }
}

export default useRequest;
