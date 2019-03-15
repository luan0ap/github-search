const getUserInfos = (user, otherParameters = '') =>
  global.fetch(`https://api.github.com/users/${user}${otherParameters}`);

export default getUserInfos;
