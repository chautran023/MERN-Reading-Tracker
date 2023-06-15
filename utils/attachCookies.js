const attachCookie = ({ res, token }) => {
    //Kem token vao response.cookie sau moi lan create token (register, login, updateUser)
    const oneDay = 1000 * 60 * 60 * 24;
  
    res.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
    });
  };
  
  export default attachCookie;

  //Why cookie vs localStorage: browser auto send the token with every request >>> good for frontend, no need to store in state