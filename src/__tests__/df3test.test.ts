import { RuuviTagBroadcast } from '../ruuvitagbroadcast';
import { df3parser } from '../ruuvi_endpoint_3';

/* https://gist.github.com/tauzen/3d18825ae41ff3fc8981 */
function hexStringToByte(str: string): Uint8Array {
    if (!str) {
        return new Uint8Array(0);
    }

    let a: number[] = [];
    for (let i: number = 0, len = str.length; i < len; i+=2) {
        a.push(parseInt(str.substr(i,2),16));
    }

    return new Uint8Array(a);
}

test('test_df3decode_is_valid', () => {
    let data: Uint8Array = hexStringToByte('03291A1ECE1EFC18F94202CA0B53');
    let tag: RuuviTagBroadcast = df3parser(data);
    expect(tag.dataFormat).toBe(3);
    expect(tag.temperatureC).toBeCloseTo(26.3, 1);
    expect(tag.pressurePa).toBe(102766);
    expect(tag.humidityRh).toBeCloseTo(20.5, 1);
    expect(tag.batteryVoltageV).toBeCloseTo(2.899, 3);
    expect(tag.accelerationXG).toBeCloseTo(-1.000, 3);
    expect(tag.accelerationYG).toBeCloseTo(-1.726, 3);
    expect(tag.accelerationZG).toBeCloseTo(0.714, 3);
});


test('test_df3decode_is_valid_max_values', () => {

    let humidity: string = 'C8';
    let temp: string = '7F63';
    let pressure: string = 'FFFF';
    let accX: string = '03E8';
    let accY: string = '03E8';
    let accZ: string = '03E8';
    let batt: string = 'FFFF';
    let data: Uint8Array = hexStringToByte('03' + humidity + temp + pressure + accX + accY + accZ + batt);

    let tag: RuuviTagBroadcast = df3parser(data);
    expect(tag.dataFormat).toBe(3);
    expect(tag.temperatureC).toBeCloseTo(127.99, 2);
    expect(tag.pressurePa).toBe(115535);
    expect(tag.humidityRh).toBe(100.0);
    expect(tag.batteryVoltageV).toBeCloseTo(65.535, 3);
    expect(tag.accelerationXG).toBeCloseTo(1.000, 3);
    expect(tag.accelerationYG).toBeCloseTo(1.000, 3);
    expect(tag.accelerationZG).toBeCloseTo(1.000, 3);
});

test('test_df3decode_is_valid_min_values', () => {

    let humidity: string = '00';
    let temp: string = 'FF63';
    let pressure: string = '0000';
    let accX: string = 'FC18';
    let accY: string = 'FC18';
    let accZ: string = 'FC18';
    let batt: string = '0000';
    let data: Uint8Array = hexStringToByte('03' + humidity + temp + pressure + accX + accY + accZ + batt);

    let tag: RuuviTagBroadcast = df3parser(data);
    expect(tag.dataFormat).toBe(3);
    expect(tag.temperatureC).toBeCloseTo(-127.99, 2);
    expect(tag.pressurePa).toBe(50000);
    expect(tag.humidityRh).toBeCloseTo(0.0, 1);
    expect(tag.batteryVoltageV).toBeCloseTo(0, 1);
    expect(tag.accelerationXG).toBeCloseTo(-1.000, 3);
    expect(tag.accelerationYG).toBeCloseTo(-1.000, 3);
    expect(tag.accelerationZG).toBeCloseTo(-1.000, 3);

});