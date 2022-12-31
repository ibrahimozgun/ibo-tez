import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import { getClients, getTransactions } from "../selectors";
import "../style/print.css";

const PrintModal = ({ item }) => {
  const clients = useSelector((state) => getClients(state));
  const transactions = useSelector((state) => getTransactions(state));
  const printClient = clients.filter((cl) => cl.name === item.clientName);
  const printTransaction = transactions.filter((tr) => tr._id === item._id);
  console.log("printTransaction: ", printTransaction);
  const remainFields = [];
  for (
    let index = 0;
    index < 20 - printTransaction[0].products.length;
    index++
  ) {
    remainFields.push(0);
  }

  const createPDF = async (e) => {
    e.preventDefault();
    const pdf = new jsPDF("portrait", "pt", "a4");
    html2canvas();
    const data = await html2canvas(document.getElementById("transaction"));
    console.log("data: ", data);
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  const [pClient, setPClient] = useState([]);
  const [pTransaction, setPTransaction] = useState([]);

  useEffect(() => {
    setPClient(printClient);
    setPTransaction(printTransaction);
  }, []);

  return (
    <>
      <button onClick={createPDF} className="text-lg" type="button">
        PDF olarak kaydet
      </button>

      <div id="transaction" className="w-[900px] p-0 m-0 overflow-hidden">
        <div style={{ margin: `20px` }}>
          <table border="0">
            <tbody>
              <tr valign="top">
                <td width="40%">
                  <br />
                  <hr />
                  <table align="center" border="0" width="100%">
                    <tbody>
                      <tr align="left">
                        <td align="left">
                          ÖZGÜN TARIM GIDA HAYVANCILIK NAKLİYAT SAN TİC LTD ŞTİ
                          <br />
                        </td>
                      </tr>
                      <tr align="left">
                        <td align="left">
                          MEYDAN  No:8 
                          <br />
                          33600 MUT/ MERSİN 
                        </td>
                      </tr>
                      <tr align="left">
                        <td align="left">Tel: 0538 550 88 18</td>
                      </tr>
                      <tr align="left">
                        <td>Web Sitesi: </td>
                      </tr>
                      <tr align="left">
                        <td>E-Posta: ozgunticaret33@hotmail.com </td>
                      </tr>
                      <tr align="left">
                        <td align="left">Vergi Dairesi: MUT MAL MÜDÜRLÜĞÜ  </td>
                      </tr>
                      <tr align="left">
                        <td>VKN: 6920713152</td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                </td>
                <td width="20%" align="center" valign="middle">
                  <br />
                  <br />
                  <img
                    style={{ width: "91px" }}
                    align="middle"
                    alt="E-Fatura Logo"
                    src="data:image/jpeg;base64,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"
                  />
                  <h1 align="center">
                    <span style={{ fontWweight: "bold" }}>e-Arşiv Fatura</span>
                  </h1>
                  <img
                    align="middle"
                    alt="İMZA"
                    src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAA9AGQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD3+iiigAooooAKKKKACop50t1DSBtpOCQMgfWpTyMVmXl1C9wLYyZSHDyqvzM3dVAHPoT7Y9aaV2Juxp0VmvqIkV0VWTcFMchIw6lgCR6Yz39RUh1SKR/LtEe7fOCYvuL9WPH4dfanysLovUUUVIwooooAKKKO+aACimSyrDE0jnCr1NUI9atpX2qk2ef4PSqUW9UK6NKis6HV4ppEURSjecAkf59aVtVVUz9nmLnogXk0ckuwcyJr9JHtW8vJYc7R/F9fX1x7VTt7W4jiWO3XyUBJ3NGqnJ6nvyfoKkk1SRHZVsLh9p/hHWnS39wkcbrp8sgZckBhlT6YqkpJWFdGfqGjxj7A0pacJcKuxz8gU/7PTqBW+qqihVUKoGAAOBWc15es7qlgrBT8hMw+b3qzaTXMqsbm3EJHQBt1EuZrX8wVr6FmiiisygooooAKKKKAKV7qcFjJHHKsjNJ93auR+J7Vm3erQXJRIWuYm5G5E4ByBk4PTJ/Wr2rWM97Cq285iIPzDcQGHoay47izN7NL/a29C3MYdzt+U8f1/CuinGLjfqQ7lmG58ycQJJds74bzQnyjGeD2/wD1VGqNKskZjvmZBv3H5SxzggflmoLaa2M6xPqzkxOHQqx+dTjhs/T+dNK6aLmaD+0Lj94SjKwJxnHQ9gPWr5LP/gAXPK877IGtrpl3PljJgoc/xY/SqkNskN4udPki2kuZnuMqD16+xAH41Bd2+lR3EiPe3WRgBFHQkdf61ny2l0dR2kPJZmXCfL1GVzn68GtadO63t9/+YGvbK8P71LC2huY8EB7rPy8jcf8APpWhBf6g9zDGy2bLJ8zBJssq5wcevf8AKuZs7SRCs3kySERMzq8JOF24AB78449qv2ULrf2AjhdS3lsGZMYUKQ4Pfr0FFSnHX+v1FsdfRRRXnmgUUUUAFFFFABVNNKsI92LSLk5OVz/OrlFNNrYCsbCzLK32aIFWDAhAMH1pzWds8hkaFC5IJbbySOlT0Ucz7gMeGKQMHjVgwwQRnIpr28Mlv5DRgxYA2dsDpUtFF2A2ONIY1jjUKijAA7CmG2ga4E7RIZgMByOQKloouwCiiikAUUUUAf/Z"
                  />
                </td>
                <td
                  width="40%"
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <img src="data:image/jpeg;base64,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" />
                </td>
              </tr>
              <tr style={{ height: "118px" }} valign="top">
                <td width="40%" align="right" valign="bottom">
                  <table id="customerPartyTable" align="left" border="0">
                    <tbody>
                      <tr style={{ height: "71px" }}>
                        <td>
                          <hr />
                          <table align="center" border="0">
                            <tbody>
                              <tr>
                                <td style={{ width: "469px" }} align="left">
                                  <span style={{ fontWeight: "bold" }}>
                                    SAYIN
                                  </span>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: "469px" }} align="left">
                                  {pClient[0]?.name}
                                  <br />
                                </td>
                              </tr>
                              <tr>
                                <td style={{ width: "469px" }} align="left">
                                  {pClient[0]?.address}{" "}
                                  {pClient[0]?.administration}
                                </td>
                              </tr>
                              <tr align="left">
                                <td>Web Sitesi: </td>
                              </tr>
                              <tr align="left">
                                <td>E-Posta: </td>
                              </tr>
                              <tr align="left">
                                <td style={{ width: "469px" }} align="left">
                                  Tel: {pClient[0]?.phoneNumber}
                                </td>
                              </tr>
                              <tr align="left">
                                <td>
                                  Vergi Dairesi: {pClient[0]?.city}{" "}
                                  {pClient[0]?.administration}
                                </td>
                              </tr>
                              <tr align="left">
                                <td>VKN: {pClient[0]?.taxNumber}</td>
                              </tr>
                            </tbody>
                          </table>
                          <hr />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <br />
                </td>
                <td width="60%" align="right" valign="bottom" colspan="2">
                  <table border="1" id="despatchTable">
                    <tbody>
                      <tr>
                        <td style={{ width: "105px" }} align="left">
                          <span style={{ fontWeight: "bold" }}>
                            Özelleştirme No:
                          </span>
                        </td>
                        <td style={{ width: "110px" }} align="left">
                          TR1.2
                        </td>
                      </tr>
                      <tr style={{ height: "13px" }}>
                        <td align="left">
                          <span style={{ fontWeight: "bold" }}>Senaryo:</span>
                        </td>
                        <td align="left">EARSIVFATURA</td>
                      </tr>
                      <tr style={{ height: "13px" }}>
                        <td align="left">
                          <span style={{ fontWeight: "bold" }}>
                            Fatura Tipi:
                          </span>
                        </td>
                        <td align="left">SATIS</td>
                      </tr>
                      <tr style={{ height: "13px" }}>
                        <td align="left">
                          <span style={{ fontWeight: "bold" }}>Fatura No:</span>
                        </td>
                        <td align="left">OAF2022000000189</td>
                      </tr>
                      <tr style={{ height: "13px" }}>
                        <td align="left">
                          <span style={{ fontWeight: "bold" }}>
                            Fatura Tarihi:
                          </span>
                        </td>
                        <td align="left">
                          {
                            new Date(pTransaction[0]?.date)
                              .toLocaleString("tr-TR")
                              .split(" ")[0]
                          }
                        </td>
                      </tr>
                      <tr style={{ height: "13px" }}>
                        <td align="left">
                          <span style={{ fontWeight: "bold" }}>
                            Fatura Saati:
                          </span>
                        </td>
                        <td align="left">
                          {
                            new Date(pTransaction[0]?.date)
                              .toLocaleString("tr-TR")
                              .split(" ")[1]
                          }
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr align="left">
                <td align="left" valign="top" id="ettnTable">
                  <span style={{ fontWeight: "bold" }}>ETTN: </span>
                  FCD3A826-8F0B-4493-99A4-365909E1F340
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{ width: "100%" }}>
            <span> </span>
          </div>
          <table border="1" id="lineTable" width="800">
            <tbody>
              <tr className="lineTableTr">
                <td
                  className="lineTableTd"
                  style={{ width: "3%" }}
                  align="center"
                >
                  <span style={{ fontWeight: "bold" }}>Sıra No</span>
                </td>
                <td
                  className="lineTableTd"
                  style={{ width: "20%" }}
                  align="center"
                >
                  <span style={{ fontWeight: "bold" }}>Mal Hizmet</span>
                </td>
                <td
                  className="lineTableTd"
                  style={{ width: "7.4%" }}
                  align="center"
                >
                  <span style={{ fontWeight: "bold" }}>Miktar</span>
                </td>
                <td
                  className="lineTableTd"
                  style={{ width: "9%" }}
                  align="center"
                >
                  <span style={{ fontWeight: "bold" }}>Birim Fiyat</span>
                </td>
                <td
                  className="lineTableTd"
                  style={{ width: "7%" }}
                  align="center"
                >
                  <span style={{ fontWeight: "bold" }}>İskonto Oranı</span>
                </td>
                <td
                  className="lineTableTd"
                  style={{ width: "9%" }}
                  align="center"
                >
                  <span style={{ fontWeight: "bold" }}>İskonto Tutarı</span>
                </td>
                <td
                  className="lineTableTd"
                  style={{ width: "7%" }}
                  align="center"
                >
                  <span style={{ fontWeight: "bold" }}>KDV Oranı</span>
                </td>
                <td
                  className="lineTableTd"
                  style={{ width: "10%" }}
                  align="center"
                >
                  <span style={{ fontWeight: "bold" }}>KDV Tutarı</span>
                </td>
                <td
                  className="lineTableTd"
                  style={{ width: "17%" }}
                  align="center"
                >
                  <span style={{ fontWeight: "bold" }}>Diğer Vergiler</span>
                </td>
                <td
                  className="lineTableTd"
                  style={{ width: "11%" }}
                  align="center"
                >
                  <span style={{ fontWeight: "bold" }}>Mal Hizmet Tutarı</span>
                </td>
              </tr>
              {pTransaction[0]?.products?.map((pr, key) => (
                <tr className="lineTableTr">
                  <td className="lineTableTd"> {key + 1}</td>
                  <td className="lineTableTd">{pr?.name}</td>
                  <td className="lineTableTd" align="right">
                     {pr?.amount}
                  </td>
                  <td className="lineTableTd" align="right">
                    {pr?.price} TL
                  </td>
                  <td className="lineTableTd" align="right">
                     
                  </td>
                  <td className="lineTableTd" align="right">
                     
                  </td>
                  <td className="lineTableTd" align="right">
                      %{pr?.tax}
                  </td>
                  <td className="lineTableTd" align="right">
                      {((pr?.price * pr?.tax) / 100) * pr?.amount} TL
                  </td>
                  <td
                    className="lineTableTd"
                    style={{ fontSize: "xx-small" }}
                    align="right"
                  >
                     
                  </td>
                  <td className="lineTableTd" align="right">
                    {pr?.price * pr?.amount} TL
                  </td>
                </tr>
              ))}
              {remainFields.map(() => (
                <tr className="lineTableTr">
                  <td className="lineTableTd"> </td>
                  <td className="lineTableTd"> </td>
                  <td className="lineTableTd" align="right">
                     
                  </td>
                  <td className="lineTableTd" align="right">
                     
                  </td>
                  <td className="lineTableTd" align="right">
                     
                  </td>
                  <td className="lineTableTd" align="right">
                     
                  </td>
                  <td className="lineTableTd" align="right">
                     
                  </td>
                  <td className="lineTableTd" align="right">
                     
                  </td>
                  <td className="lineTableTd" align="right">
                     
                  </td>
                  <td className="lineTableTd" align="right">
                     
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table id="budgetContainerTable" width="800px">
            <tr align="right">
              <td></td>
              <td className="lineTableBudgetTd" align="right" width="200px">
                <span style={{ fontWeight: "bold" }}>
                  Mal Hizmet Toplam Tutarı
                </span>
              </td>
              <td
                className="lineTableBudgetTd"
                style={{ width: "81px" }}
                align="right"
              >
                {pTransaction[0]?.totalPrice} TL
              </td>
            </tr>
            <tr align="right">
              <td></td>
              <td className="lineTableBudgetTd" align="right" width="200px">
                <span style={{ fontWeight: "bold" }}>Toplam İskonto</span>
              </td>
              <td
                className="lineTableBudgetTd"
                style={{ width: "81px" }}
                align="right"
              ></td>
            </tr>

            <tr align="right">
              <td></td>
              <td className="lineTableBudgetTd" width="200px" align="right">
                <span style={{ fontWeight: "bold" }}>
                  Vergiler Dahil Toplam Tutar
                </span>
              </td>
              <td
                className="lineTableBudgetTd"
                style={{ width: "82px" }}
                align="right"
              >
                {pTransaction[0]?.totalPrice} TL
              </td>
            </tr>
            <tr align="right">
              <td></td>
              <td className="lineTableBudgetTd" width="200px" align="right">
                <span style={{ fontWeight: "bold" }}>Ödenecek Tutar</span>
              </td>
              <td
                className="lineTableBudgetTd"
                style={{ width: "82px" }}
                align="right"
              >
                {pTransaction[0]?.totalPrice} TL
              </td>
            </tr>
          </table>
          <br />
          <br />
          <table id="notesTable" width="800" align="left">
            <tbody>
              <tr align="left">
                <td id="notesTableTd" height="100">
                  <b>      Not: </b>YAZI_ILE:Altıyüzon . ₺<br />
                  <br />
                  <br />
                  <b>
                          e-Arşiv izni kapsamında elektronik ortamda
                    iletilmiştir.
                  </b>
                  <br />
                  <b>      İrsaliye yerine geçerlidir.</b>
                  <br />
                  <hr />
                  <table id="hesapBilgileri" width="800px">
                    <tbody>
                      <tr>
                        <td>
                          <fieldset style={{ border: "1px solid black" }}>
                            <legend
                              align="center"
                              style={{
                                backgroundColor: "white",
                                borderWidth: "10px",
                              }}
                            >
                              <b>BANKA HESAP BİLGİLERİ</b>
                            </legend>
                            <table width="100%" border="0">
                              <tr>
                                <td style={{ fontWeight: "bold" }}>BANKA </td>
                                <td style={{ fontWeight: "bold" }}>ŞUBE </td>
                                <td style={{ fontWeight: "bold" }}>IBAN </td>
                              </tr>
                              <tr>
                                <td>
                                  YAPI KREDİ BANKASI TL
                                  <br />
                                  ZİRAAT BANKASI TL
                                  <br />
                                  VAKIF BANKASI TL
                                  <br />
                                  İŞ BANKASI TL
                                </td>
                                <td>
                                  MUT
                                  <br />
                                  MUT
                                  <br />
                                  MUT
                                  <br />
                                  MUT
                                </td>
                                <td>
                                  TR 670006701000000076360784
                                  <br />
                                  TR 690001000211965935455001
                                  <br />
                                  TR 610006400000166300639195
                                  <br />
                                  TR 070001500158007313236731
                                </td>
                              </tr>
                            </table>
                          </fieldset>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                  <div></div>
                  <table
                    id="notesTable2"
                    style={{ marginTop: "2px" }}
                    width="800"
                    align="left"
                  >
                    <tr>
                      <td align="middle">
                        E-Dönüşüm Merkezi EDM Teknolojileri ile Üretilmiştir
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PrintModal;
