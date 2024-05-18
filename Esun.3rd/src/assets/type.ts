export interface Parking {
    seq: number;
    area: string;
    name: string;
    count: number;
    address: string;
}

export interface ParkingDto {
    seq: number;
    行政區: string;
    臨時停車處所: string;
    可提供小型車停車位: number;
    地址: string;
}
