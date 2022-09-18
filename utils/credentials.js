module.exports = (user) => {
    let email = `${user}-${Math.random()}@benzoh.dev`;
    let password = `${Math.random()}`;
    
    email = String(email);
    password = String(password);
    
    let credential = { email, password };
    
    return credential;
};
