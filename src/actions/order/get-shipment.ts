"use server";

interface OrigenAddress {
  countryCode: string;
  postalCode: string;
}

interface DestinationAddress {
  countryCode: string;
  postalCode: string;
}

export async function getShipment(
  originAddress: OrigenAddress,
  destinationAddress: DestinationAddress,
) {
  const apiUrl = "https://enviaya.com.mx/api/v1/";

  const payload = {
    enviaya_account: "C0YPN945",
    api_key: "4b77b2c8ba19b0d354809e9e6fb1cee4",
    carrier_account: null,
    shipment: {
      shipment_type: "Package",
      parcels: [
        {
          quantity: "1",
          weight: "1",
          weight_unit: "kg",
          length: "30",
          height: "3",
          width: "23",
          dimension_unit: "cm",
        },
      ],
    },

    origin_direction: {
      postal_code: originAddress.postalCode,
      country_code: originAddress.countryCode,
    },
    destination_direction: {
      postal_code: destinationAddress.postalCode,
      country_code: destinationAddress.countryCode,
    },
    insured_value_currency: "MXN",
    order_total_amount: 60,
    currency: "MXN",
    intelligent_filtering: true,
    enable_cached_rates: true,
    timeout: 15,
  };

  try {
    const res = await fetch(`${apiUrl}/rates`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    return res;
  } catch (e) {
    console.log(e);
    return null;
  }
}
