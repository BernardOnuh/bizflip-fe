      <div className={styles.topContainer}>
        <div className={styles.itemSummary}>
          <div className={styles.itemMedia}>
            <div className={styles.media}>
              {loading ? (
                <Loader
                  type="Oval"
                  color="#007BFF"
                  height={32}
                  width={32}
                  className={styles.loader}
                />
              ) : !bundleID || bundleItems.current.length ? (
                bundleID ? (
                  renderMedia(
                    bundleItems.current[previewIndex].metadata?.image,
                    bundleItems.current[previewIndex].contentType
                  )
                ) : (
                  renderMedia(info?.image, contentType.current)
                )
              ) : null}
            </div>
            {bundleID && (
              <div className={styles.previewList}>
                {(loading ? [null, null, null] : bundleItems.current).map(
                  (item, idx) => (
                    <div
                      key={idx}
                      className={cx(
                        styles.preview,
                        !loading && idx === previewIndex && styles.active
                      )}
                      onClick={() => setPreviewIndex(idx)}
                    >
                      {item ? (
                        <Suspense
                          fallback={
                            <Loader
                              type="Oval"
                              color="#007BFF"
                              height={32}
                              width={32}
                              className={styles.loader}
                            />
                          }
                        >
                          <SuspenseImg
                            src={
                              item.thumbnailPath?.length > 10
                                ? `${storageUrl}/image/${item.thumbnailPath}`
                                : item.metadata?.image
                            }
                          />
                        </Suspense>
                      ) : (
                        <Skeleton width={72} height={72} />
                      )}
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <div className={styles.itemInfo}>{renderItemInfo()}</div>
          <div className={styles.itemInfoCont}>
            {info?.properties && (
              <Panel title="Properties" icon={LabelIcon}>
                <div className={styles.panelBody}>
                  {renderProperties(info.properties)}
                </div>
              </Panel>
            )}
            {bundleID && renderBundleInfoPanel()}
            {!bundleID && renderAboutPanel()}
            {!bundleID && renderCollectionPanel()}
            {!bundleID && renderRoyaltyPanel()}
          </div>
        </div>
        <div className={styles.itemMain}>
          <div className={styles.itemInfoWrapper}>{renderItemInfo()}</div>
          {info?.properties && (
            <div className={cx(styles.panelWrapper, styles.infoPanel)}>
              <Panel title="Properties">
                <div className={styles.panelBody}>
                  {renderProperties(info.properties)}
                </div>
              </Panel>
            </div>
          )}
          {bundleID && (
            <div className={cx(styles.panelWrapper, styles.infoPanel)}>
              {renderBundleInfoPanel()}
            </div>
          )}
          {!bundleID && (
            <div className={cx(styles.panelWrapper, styles.infoPanel)}>
              {renderAboutPanel()}
            </div>
          )}
          {!bundleID && (
            <div className={cx(styles.panelWrapper, styles.infoPanel)}>
              {renderCollectionPanel()}
            </div>
          )}
          {!bundleID && (
            <div className={cx(styles.panelWrapper, styles.infoPanel)}>
              {renderRoyaltyPanel()}
            </div>
          )}
          {(winner || auction.current?.resulted === false) && (
            <div className={styles.panelWrapper}>
              <Panel
                title={
                  auctionStarted
                    ? auctionEnded
                      ? 'Sale ended'
                      : `Sale ends in ${formatDuration(
                          auction.current.endTime
                        )} (${new Date(
                          auction.current.endTime * 1000
                        ).toLocaleString()})`
                    : `Sale starts in ${formatDuration(
                        auction.current.startTime
                      )}`
                }
                fixed
              >
                <div className={styles.bids}>
                  {auctionEnded ? (
                    <div className={styles.result}>
                      {auction.current.resulted ? (
                        <>
                          {'Winner: '}
                          <Link to={`/account/${winner}`}>
                            {winner?.toLowerCase() === account?.toLowerCase()
                              ? 'Me'
                              : shortenAddress(winner)}
                          </Link>
                          &nbsp;(
                          <img
                            src={winningToken?.icon}
                            className={styles.tokenIcon}
                          />
                          {formatNumber(winningBid)})
                        </>
                      ) : (
                        'Auction has concluded'
                      )}
                    </div>
                  ) : (
                    ''
                  )}
                  {bid ? (
                    <div>
                      <div className={styles.bidtitle}>
                        Reserve Price :&nbsp;
                        <img
                          src={auction.current.token?.icon}
                          className={styles.tokenIcon}
                        />
                        {formatNumber(auction.current.reservePrice)}
                      </div>
                      <br />
                      <div className={styles.bidtitle}>
                        Highest Bid :&nbsp;
                        <img
                          src={auction.current.token?.icon}
                          className={styles.tokenIcon}
                        />
                        {formatNumber(bid.bid)}
                        {bid.bid < auction.current.reservePrice
                          ? ' -- Reserve price not met'
                          : ''}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.bidtitle}>
                      No bids yet (Reserve Price :&nbsp;
                      <img
                        src={auction.current.token?.icon}
                        className={styles.tokenIcon}
                      />
                      {formatNumber(auction.current.reservePrice)}
                      {minBid > 0 &&
                        ` | First Bid
                      should match reserve price`}
                      )
                    </div>
                  )}

                  {!isMine &&
                    auctionActive() &&
                    bid?.bidder?.toLowerCase() === account?.toLowerCase() &&
                    now.getTime() / 1000 >=
                      auction?.current?.startTime + 5184000 && (
                      <div
                        className={cx(
                          styles.withdrawBid,
                          bidWithdrawing && styles.disabled
                        )}
                        onClick={() => handleWithdrawBid()}
                      >
                        {bidWithdrawing
                          ? 'Withdrawing Bid...'
                          : 'Withdraw Bid'}
                      </div>
                    )}

                  {!isMine &&
                    (!auctionActive() &&
                    bid?.bidder?.toLowerCase() === account?.toLowerCase()
                      ? now.getTime() / 1000 >=
                          auction?.current?.endTime + 43200 && (
                          <div
                            className={cx(
                              styles.withdrawBid,
                              bidWithdrawing && styles.disabled
                            )}
                            onClick={() => handleWithdrawBid()}
                          >
                            {bidWithdrawing
                              ? 'Withdrawing Bid...'
                              : 'Withdraw Bid'}
                          </div>
                        )
                      : // )
                        !isMine &&
                        bid?.bidder?.toLowerCase() !==
                          account?.toLowerCase() &&
                        auctionActive() && (
                          <div
                            className={cx(
                              styles.placeBid,
                              bidPlacing && styles.disabled
                            )}
                            onClick={() => setBidModalVisible(true)}
                          >
                            Place Bid
                          </div>
                        ))}
                  {isMine && auctionEnded && !auction.current.resulted && (
                    <div
                      className={cx(
                        styles.placeBid,
                        resulting && styles.disabled
                      )}
                      onClick={
                        bid === null ||
                        bid?.bid < auction.current?.reservePrice
                          ? cancelCurrentAuction
                          : handleResultAuction
                      }
                    >
                      {auctionCancelConfirming ? (
                        <ClipLoader color="#FFF" size={16} />
                      ) : bid === null ||
                        bid?.bid < auction.current.reservePrice ? (
                        'Reserve Price not met. Cancel Auction'
                      ) : (
                        'Accept highest bid'
                      )}
                    </div>
                  )}
                </div>
              </Panel>
            </div>
          )}
          {!bundleID && (
            <div className={styles.panelWrapper}>
              <Panel title="Price History" icon={TimelineIcon}>
                <ReactResizeDetector>
                  {({ width }) =>
                    width > 0 ? (
                      <div className={styles.chartWrapper}>
                        <div className={styles.chart}>
                          <LineChart
                            width={width}
                            height={250}
                            data={data}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5,
                            }}
                          >
                            <XAxis dataKey="date" />
                            <YAxis />
                            <ChartTooltip />
                            <CartesianGrid stroke="#eee" />
                            <Line
                              type="monotone"
                              dataKey="price"
                              stroke="#2479FA"
                            />
                          </LineChart>
                        </div>
                      </div>
                    ) : (
                      <div>{width}</div>
                    )
                  }
                </ReactResizeDetector>
              </Panel>
            </div>
          )}
          <div className={styles.panelWrapper}>
            <Panel title="Listings" icon={LocalOfferIcon} expanded>
              <div className={styles.listings}>
                <div className={cx(styles.listing, styles.heading)}>
                  <div className={styles.owner}>From</div>
                  <div className={styles.price}>Price</div>
                  {tokenInfo?.totalSupply > 1 && (
                    <div className={styles.quantity}>Quantity</div>
                  )}
                  <div className={styles.buy} />
                </div>
                {bundleID
                  ? bundleListing.current && (
                      <div className={styles.listing}>
                        <div className={styles.owner}>
                          {loading ? (
                            <Skeleton width={100} height={20} />
                          ) : (
                            <Link to={`/account/${owner}`}>
                              <div className={styles.userAvatarWrapper}>
                                {ownerInfo?.imageHash ? (
                                  <img
                                    src={`https://cloudflare-ipfs.com/ipfs/${ownerInfo.imageHash}`}
                                    className={styles.userAvatar}
                                  />
                                ) : (
                                  <Identicon
                                    account={owner}
                                    size={24}
                                    className={styles.userAvatar}
                                  />
                                )}
                              </div>
                              {isMine
                                ? 'Me'
                                : ownerInfo?.alias || shortenAddress(owner)}
                            </Link>
                          )}
                        </div>
                        <div className={styles.price}>
                          {loading ? (
                            <Skeleton width={100} height={20} />
                          ) : (
                            <>
                              <img
                                src={bundleListing.current.token?.icon}
                                className={styles.tokenIcon}
                              />
                              {formatNumber(bundleListing.current.price)}
                            </>
                          )}
                        </div>
                        <div className={styles.buy}>
                          {!isMine && (
                            <TxButton
                              className={cx(
                                styles.buyButton,
                                buyingItem && styles.disabled
                              )}
                              onClick={handleBuyBundle}
                            >
                              {buyingItem ? (
                                <ClipLoader color="#FFF" size={16} />
                              ) : (
                                'Buy'
                              )}
                            </TxButton>
                          )}
                        </div>
                      </div>
                    )
                  : listings.current.map((listing, idx) => (
                      <div className={styles.listing} key={idx}>
                        <div className={styles.owner}>
                          <Link to={`/account/${listing.owner}`}>
                            <div className={styles.userAvatarWrapper}>
                              {listing.image ? (
                                <img
                                  src={`https://cloudflare-ipfs.com/ipfs/${listing.image}`}
                                  className={styles.userAvatar}
                                />
                              ) : (
                                <Identicon
                                  account={listing.owner}
                                  size={24}
                                  className={styles.userAvatar}
                                />
                              )}
                            </div>
                            {listing.alias || listing.owner?.substr(0, 6)}
                          </Link>
                        </div>
                        <div className={styles.price}>
                          <img
                            src={listing.token?.icon}
                            className={styles.tokenIcon}
                          />
                          {formatNumber(listing.price)}&nbsp;(
                          {prices[listing.token?.address] !== undefined ? (
                            `$${(
                              listing.price * prices[listing.token?.address]
                            ).toFixed(3)}`
                          ) : (
                            <Skeleton width={60} height={24} />
                          )}
                          )
                        </div>
                        {tokenInfo?.totalSupply > 1 && (
                          <div className={styles.quantity}>
                            {formatNumber(listing.quantity)}
                          </div>
                        )}
                        <div className={styles.buy}>
                          {listing.owner.toLowerCase() !==
                            account?.toLowerCase() && (
                            <TxButton
                              className={cx(
                                styles.buyButton,
                                buyingItem && styles.disabled
                              )}
                              onClick={() => handleBuyItem(listing)}
                            >
                              {buyingItem ? (
                                <ClipLoader color="#FFF" size={16} />
                              ) : (
                                'Buy'
                              )}
                            </TxButton>
                          )}
                        </div>
                      </div>
                    ))}
              </div>
            </Panel>
          </div>
          <div className={styles.panelWrapper}>
            <Panel title="Direct Offers" icon={TocIcon} expanded>
              <div className={styles.offers}>
                {offers.current.length ? (
                  <>
                    <div className={cx(styles.offer, styles.heading)}>
                      <div className={styles.owner}>From</div>
                      <div className={styles.price}>Price</div>
                      {tokenInfo?.totalSupply > 1 && (
                        <div className={styles.quantity}>Quantity</div>
                      )}
                      <div className={styles.quantity}>Type</div>
                      <div className={styles.deadline}>Expires In</div>
                      <div className={styles.buy} />
                    </div>
                    {offers.current
                      .filter(offer => offer.deadline > now.getTime())
                      .sort((a, b) =>
                        a.pricePerItem < b.pricePerItem ? 1 : -1
                      )
                      .map((offer, idx) => (
                        <div className={styles.offer} key={idx}>
                          <div className={styles.owner}>
                            <Link to={`/account/${offer.creator}`}>
                              <div className={styles.userAvatarWrapper}>
                                {offer.image ? (
                                  <img
                                    src={`https://cloudflare-ipfs.com/ipfs/${offer.image}`}
                                    className={styles.userAvatar}
                                  />
                                ) : (
                                  <Identicon
                                    account={offer.creator}
                                    size={24}
                                    className={styles.userAvatar}
                                  />
                                )}
                              </div>
                              {offer.alias || offer.creator?.substr(0, 6)}
                            </Link>
                          </div>
                          {offer.type === 'token' ? (
                            <div className={styles.price}>
                              <img
                                src={offer.token?.icon}
                                className={styles.tokenIcon}
                              />
                              {formatNumber(
                                offer.pricePerItem || offer.price
                              )}
                              &nbsp;(
                              {prices[offer.token.address] !== undefined ? (
                                `$${(
                                  (offer.pricePerItem || offer.price) *
                                  prices[offer.token.address]
                                ).toFixed(3)}`
                              ) : (
                                <Skeleton width={60} height={24} />
                              )}
                              )
                            </div>
                          ) : (
                            <div className={styles.price}>
                              $
                              {formatNumber(
                                offer.pricePerItem || offer.price
                              )}
                            </div>
                          )}
                          <div className={styles.quantity}>{offer.type}</div>
                          {tokenInfo?.totalSupply > 1 && (
                            <div className={styles.quantity}>
                              {formatNumber(offer.quantity)}
                            </div>
                          )}
                          <div className={styles.deadline}>
                            {formatExpiration(offer.deadline)}
                          </div>
                          {offer.signed && offer.type === 'token' && (
                            <div className={styles.buy}>
                              {(isMine ||
                                (myHolding &&
                                  myHolding.supply >= offer.quantity)) &&
                                offer.creator?.toLowerCase() !==
                                  account?.toLowerCase() && (
                                  <div
                                    className={cx(
                                      styles.buyButton,
                                      (salesContractApproving ||
                                        offerAccepting) &&
                                        styles.disabled
                                    )}
                                    onClick={
                                      bundleID
                                        ? isBundleContractApproved
                                          ? () => handleAcceptOffer(offer)
                                          : handleApproveBundleSalesContract
                                        : salesContractApproved
                                        ? () => handleAcceptOffer(offer)
                                        : handleApproveSalesContract
                                    }
                                  >
                                    {!(bundleID
                                      ? isBundleContractApproved
                                      : salesContractApproved) ? (
                                      salesContractApproving ? (
                                        <ClipLoader color="#FFF" size={16} />
                                      ) : (
                                        'Approve'
                                      )
                                    ) : offerAccepting ? (
                                      <ClipLoader color="#FFF" size={16} />
                                    ) : (
                                      'Accept'
                                    )}
                                  </div>
                                )}
                              {offer.creator?.toLowerCase() ===
                                account?.toLowerCase() && (
                                <div
                                  className={cx(
                                    styles.buyButton,
                                    offerCanceling && styles.disabled
                                  )}
                                  onClick={() => handleCancelOffer()}
                                >
                                  {offerCanceling ? (
                                    <ClipLoader color="#FFF" size={16} />
                                  ) : (
                                    'Withdraw'
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                          {offer.type === 'escrow' && (
                            <>
                              {offer.owner?.toLowerCase() ===
                                account?.toLowerCase() &&
                                offer.webhookType === 'payment_received' && (
                                  <div
                                    className={cx(
                                      styles.buyButton,
                                      offerCanceling && styles.disabled
                                    )}
                                    onClick={() =>
                                      handleApproveEscrowOffer(offer)
                                    }
                                  >
                                    {offerCanceling ? (
                                      <ClipLoader color="#FFF" size={16} />
                                    ) : (
                                      'Approve'
                                    )}
                                  </div>
                                )}
                              {isEscrowConfirmed(offer) &&
                                offer.creator?.toLowerCase() ===
                                  account?.toLowerCase() && (
                                  <div
                                    className={cx(
                                      styles.buyButton,
                                      offerCanceling && styles.disabled
                                    )}
                                    onClick={() =>
                                      handleCancelEscrowOffer(offer)
                                    }
                                  >
                                    {offerCanceling ? (
                                      <ClipLoader color="#FFF" size={16} />
                                    ) : (
                                      'Withdraw'
                                    )}
                                  </div>
                                )}
                            </>
                          )}
                        </div>
                      ))}
                  </>
                ) : (
                  <div className={styles.noOffers}>
                    <div className={styles.noOffersLabel}>No Offers Yet</div>
                    {(!isMine ||
                      (tokenType.current === 1155 &&
                        myHolding.supply < tokenInfo.totalSupply)) &&
                      (!auction.current || auction.current.resulted) && (
                        <TxButton
                          className={cx(
                            styles.makeOffer,
                            offerPlacing && styles.disabled
                          )}
                          onClick={() => handleMakeOfferModal()}
                        >
                          Make Offer
                        </TxButton>
                      )}
                  </div>
                )}
              </div>
            </Panel>
          </div>
          {bundleID && (
            <div className={styles.panelWrapper}>
              <Panel title="Items" icon={ViewModuleIcon} expanded>
                <div className={styles.items}>
                  {(loading
                    ? [null, null, null]
                    : bundleItems.current
                  ).map((item, idx) => renderBundleItem(item, idx))}
                </div>
              </Panel>
            </div>
          )}
        </div>
      </div>