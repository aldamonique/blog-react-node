const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  const { token } = req.cookies;
  
  if (!token) {
    return res.status(401).json({ error: 'No token, access denied' });
  }

  try {
    // Tenta verificar o token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Se for válido, anexa as informações do usuário à requisição
    req.user = decoded;
    
    // Passa para o próximo passo (o controller da rota)
    next();
  } catch (err) {
    // Se a verificação falhar (token inválido, expirado, etc.)
    res.status(401).json({ error: 'Token is not valid' });
  }
};