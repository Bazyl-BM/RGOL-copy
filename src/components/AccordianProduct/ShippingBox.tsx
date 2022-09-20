const ShippingBox = () => (
  <>
    <div style={{ overflowX: 'auto', padding: '20px 0px' }}>
      <table
        style={{
          border: '1px solid rgb(241, 241, 241)',
          padding: '20px 0px',
          borderCollapse: 'collapse',
          textAlign: 'center',
        }}
      >
        <thead
          style={{
            backgroundColor: 'rgb(241, 241, 241)',
          }}
        ></thead>
        <thead
          style={{
            backgroundColor: 'rgb(241, 241, 241)',
          }}
        >
          <tr>
            <td
              rowSpan={2}
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Sposób wysyłki
            </td>
            <td
              rowSpan={2}
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Przewidywany czas dostawy
            </td>
            <td
              colSpan={3}
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Całkowity koszt wysyłki
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Wartość zamówienia
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Koszt dostawy
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Pobranie
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              rowSpan={2}
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              <img
                src="https://files.r-gol.com/obrazki/dpd.png"
                width="60%"
                height="auto"
                alt=""
              />
            </td>
            <td
              rowSpan={2}
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              do 2 dni roboczych
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Poniżej 249 zł
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              11,99&nbsp;zł
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              + 5,00 zł
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Powyżej 249 zł
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              GRATIS
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              + 5,00&nbsp;zł
            </td>
          </tr>
          <tr>
            <td
              rowSpan={2}
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              <img
                src="https://files.r-gol.com/obrazki/InpostMedium.png"
                width="60%"
                height="auto"
                alt=""
              />
            </td>
            <td
              rowSpan={2}
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              do 2 dni roboczych
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Poniżej 249 zł
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              11,99&nbsp;zł
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Brak możliwości płatności za pobraniem
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Powyżej 249 zł
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              GRATIS
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Brak możliwości płatności za pobraniem
            </td>
          </tr>
          <tr>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Odbiór osobisty w sklepie
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              do 2 dni roboczych
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              Wszystkie zamówienia
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              GRATIS
            </td>
            <td
              style={{
                border: '1px solid rgb(153, 153, 153)',
                padding: '5px',
              }}
            >
              GRATIS
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      <b>Dodatkowe informacje:</b>
    </p>
    <p>
      - czas realizacji zamówień z personalizacją wynosi do 5-7 dni roboczych od
      momentu zaksięgowania środków za zamówienie na naszym koncie
    </p>
    <p>
      - Dbając o Twój komfort i szybkość realizacja zamówienia, zdarza się, że
      zakupione przez Ciebie produkty wysyłamy w kilku paczkach. Oczywiście nie
      ponosisz dodatkowych kosztów dostawy. Wszystko po to, aby zakupy znalazły
      się u Ciebie jak najszybciej.
    </p>
    <p>
      <br />
    </p>
    <p>
      <b>
        POZOSTAŁE (OBSŁUGIWANE) KRAJE UNII EUROPEJSKIEJ (2-5 dni roboczych):
      </b>
    </p>
    <p>
      <b>Dostawa:</b>
    </p>
    <p>- Zamówienia do 416 zł: koszt dostawy - ok. 39 zł</p>
    <p>- Zamówienia od 416 zł: koszt dostawy - GRATIS</p>
    <p>
      <br />
    </p>
    <p>
      <b>Płatności:</b>
    </p>
    <p>- E-przelew, karty VISA/MASTERCARD,</p>
    <p>
      <br />
    </p>
    <p>
      <b>Dodatkowe informacje:</b>
    </p>
    <p>
      - Przewidywany czas dostawy: Austria - 3 dni, Belgia - 3 dni, Bułgaria - 4
      dni, Chorwacja - 5 dni, Czechy - 2 dni, Dania - 3 dni, Estonia - 3 dni,
      Finlandia - 4 dni, Francja - 3 dni, Grecja - 5 dni, Hiszpania - 4 dni,
      Holandia - 3 dni, Irlandia - 4 dni, Liechtenstein - 4 dni, Litwa - 2 dni,
      Luksemburg - 3 dni, Łotwa - 2 dni, Niemcy - 2 dni, Portugalia - 4 dni,
      Rumunia - 4 dni, Słowacja - 2 dni, Słowenia - 4 dni, Szwecja - 3 dni,
      Węgry - 3 dni, Włochy 4 dni
    </p>
    <p>
      - Graniczne wartości zamówień oraz kosztów dostawy są zależne od
      aktualnych kursów walut.
    </p>
    <p></p>
  </>
);
export default ShippingBox;
