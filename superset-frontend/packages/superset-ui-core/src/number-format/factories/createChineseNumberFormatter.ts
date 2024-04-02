import prettyMsFormatter from 'pretty-ms';
import NumberFormatter from '../NumberFormatter';

function createChineseNumberFormatter(
  config: {
    description?: string;
    id?: string;
    label?: string;
    multiplier?: number;
  } & prettyMsFormatter.Options = {},
) {
  const { description, id, label } = config;
  return new NumberFormatter({
    description,
    formatFunc: value => formatChineseCurrency(value),
    id: id ?? 'CURRENCY_CHINA',
    label: label ?? `Chinese Currency Format`,
  });
}

function formatChineseCurrency(value: number) {
  let formattedValue: String;
  let unit = '';
  const absoluteValue = Math.abs(value);
  if (absoluteValue >= 1e8) {
    formattedValue = (absoluteValue / 1e8).toFixed(2);
    unit = '亿';
    // } else if (absoluteValue >= 1e7) {
    //   formattedValue = (absoluteValue / 1e7).toFixed(2);
    //   unit = '千万';
    // } else if (absoluteValue >= 1e6) {
    //   formattedValue = (absoluteValue / 1e6).toFixed(2);
    //   unit = '百万';
  } else if (absoluteValue >= 1e4) {
    formattedValue = (absoluteValue / 1e4).toFixed(2);
    unit = '万';
    // } else if (absoluteValue >= 1e3) {
    //   formattedValue = (absoluteValue / 1e3).toFixed(2);
    //   unit = '千';
  } else {
    formattedValue = absoluteValue.toFixed(2);
  }
  if (value < 0) {
    // return `-¥${formattedValue}${unit}`;
    return `-${formattedValue}${unit}`;
  }
  // return `¥${formattedValue}${unit}`;
  return `${formattedValue}${unit}`;
}

export default createChineseNumberFormatter;
