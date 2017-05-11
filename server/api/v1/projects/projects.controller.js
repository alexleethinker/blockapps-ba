const ba = require('blockapps-rest');
const rest = ba.rest;
const common = ba.common;
const config = common.config;
const util = common.util;
const path = require('path');
const serverPath = './server';
const dapp = require(`${path.join(process.cwd(), serverPath)}/dapp/dapp.js`)(config.contractsPath);

const projectsController = {
  create: function(req, res) {
    const deploy = req.app.get('deploy');
    const name = req.body.name;
    const buyer = req.body.buyer;

    dapp.setScope()
      .then(dapp.setAdmin(deploy.adminName, deploy.adminPassword, deploy.AdminInterface.address))
      .then(dapp.createProject(
        deploy.adminName,
        name,
        buyer
      ))
      .then(scope => {
        util.response.status200(res, {
          project: scope.result
        });
      })
      .catch(err => {
        util.response.status500(res, err);
      });
  }
};

module.exports = projectsController;
