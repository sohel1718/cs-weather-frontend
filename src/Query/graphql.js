import { gql } from "@apollo/client";

export const GET_CURRENT_WEATHER = gql`
  query weatherByCoords($lat: Float!, $lon: Float!) {
    weatherByCoords(lat: $lat, lon: $lon) {
        name
        weather {
            icon
            description
        }
        main {
            temp
            feelsLike
        }
        dt
        sys {
            country
        }
    }
  }
`;

export const GET_DAILY_WEATHER = gql`
  query dailyWeatherData($lat: Float!, $lon: Float!) {
    dailyWeatherData(lat: $lat, lon: $lon) {
        hourly {
            dt
            temp
            pop
            weather {
              icon
            }
        }
        daily {
            dt
            pop
            temp {
              max
            }
            weather {
              icon
            }
        }
    }
  }
`;