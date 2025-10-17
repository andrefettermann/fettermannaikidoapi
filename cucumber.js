module.exports = {
  default: {
    require: ['features/steps/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: ['progress', 'html:cucumber-report.html'],
    publishQuiet: true
  }
};