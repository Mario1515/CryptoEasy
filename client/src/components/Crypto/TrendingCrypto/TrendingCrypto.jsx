import "./TrendingCrypto.css";

const TrendingCrypto = ({ crypto }) => {

  return (
    <>
      <div className="trending">
        <div className="container">
          <div className="trending-crypto">

            {/* Image Container  */}
            <div className="image-container">
              <img className="image" src={crypto.image} alt={crypto.id} />
            </div>
            {/* Card */}

            <div className="card-title">
              <h1>${new Intl.NumberFormat("en-IN", {
                maximumSignificantDigits: 5,
              }).format(crypto.current_price)}
                <div className="scroller">
                  <span>
                    <br />
                    {(crypto.symbol).toUpperCase()} <br />
                    Cap ${new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 0,
                    }).format(crypto.market_cap)}<br />
                    Volume ${new Intl.NumberFormat("en-IN", {
                      minimumFractionDigits: 0,
                    }).format(crypto.total_volume)}
                  </span>
                </div>

              </h1>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default TrendingCrypto;

