import React from 'react';
import Header from '../Header';

import styles from './styles.module.scss';

const PurchaseAgreement = () => {
  return (
    <div className={styles.container}>
    
      <div className={styles.contents}>
        <h2 className={styles.centered}>ASSET PURCHASE AGREEMENT</h2>
        <p>
          <b>THIS ASSET PURCHASE AGREEMENT</b> (the “Agreement”) is made and
          entered into this day of ____, 2008, (the “Effective Date”) by and
          __________ (the “Purchaser”), ______________ (“Seller”).
        </p>
        <p>
          WHEREAS, Seller is the owner of certain assets, as defined below; and
        </p>
        <p>
          WHEREAS, Purchaser desires to purchase and assume, and the Seller
          desires to sell, assign or otherwise convey, certain assets of Seller
          upon the terms and conditions set forth herein.
        </p>
        <p>
          NOW, THEREFORE, in consideration of the mutual representations,
          warranties, covenants, and agreements of the parties hereinafter set
          forth, the parties hereby agree as follows:
        </p>
        <ul className={styles.listRomain}>
          <li className={styles.titleIndent}>
            ARTICLE
            <br></br>
            SALE AND PURCHASE
            <p>
              Seller hereby agrees to sell, convey, assign, transfer and deliver
              to Purchaser, and Purchaser agrees to purchase, accept and
              acquire, all right, title and interest of Seller in and to all of
              the Assets (as defined in Article II herein), for the total
              purchase price of $__________ in cash at close, including the
              inventory and assets listed in the Exhibit A. Additional inventory
              beyond the included inventory listed in Exhibit A will be paid by
              Buyer in addition to the purchase price. On the Closing Date, on
              or before _______, 2008, the Purchase Price shall be delivered to
              Seller and seller shall transfer assets to purchaser.
            </p>
          </li>
          <li className={styles.titleIndent}>
            ARTICLE
            <br></br>
            ASSETS TO BE PURCHASED AND SOLD
            <p>
              <b>Section 2.01. Included Assets.</b> The assets to be transferred
              to Purchaser shall include only the following assets and rights of
              Seller (the “Assets”):<br></br>
              <ul className={styles.listAlphabetic}>
                <li>the inventory listed on Exhibit A (the “inventory”).</li>
                <li>
                  the right, title, and exclusive interest to all trademarks,
                  names, trade names, technical processes, computer software,
                  know‑how or other intellectual property listed on Exhibit B
                  “Intangible Property; and
                </li>
                <li>
                  the rights and interests to the customer databases and other
                  assets listed on Exhibit C.
                </li>
              </ul>
            </p>
            <p>
              <b>Section 2.02. Excluded Assets and Liabilities. </b>Only the
              Assets Seller described in Section 2.01 shall be subject to this
              Agreement; all other assets of Seller shall be excluded from
              purchase and sale hereunder. Without limiting the generality of
              the foregoing, the following assets are expressly excluded:
              <br></br>
              <ul className={styles.listAlphabetic}>
                <li>
                  Accounts receivable, bank and investment accounts, deposits
                  cash as of the “Closing Date”, as further defined in the
                  Agreement;
                </li>
                <li>All minute books, stock records and corporate seals;</li>
                <li>The shares of capital stock of Seller’s corporation;</li>
                <li>Insurance policies and rights;</li>
                <li>
                  Personal records and other records that Seller is required by
                  to retain in its possession; and
                </li>
                <li>
                  All claims for refund of taxes, customer credits or refunds
                  any other governmental charges of whatever nature.
                </li>
              </ul>
            </p>
          </li>
          <li className={styles.titleIndent}>
            ARTICLE<br></br>TRANSFER OF ASSETS
            <p>
              The Seller agrees to convey the Assets to the Purchaser by
              execution and delivery at Closing (as defined in Section 6.01) of
              this Agreement and a Bill of Sale in the form attached as
              Exhibit E to this Agreement (the “Bill of Sale”).
            </p>
          </li>
          <li className={styles.titleIndent}>
            ARTICLE
            <br></br>RETENTION OF LIABILITIES
            <p>
              <b>Section 3.01. Liabilities Not Assumed.</b> Purchaser shall not
              or be responsible for any liabilities or obligations of Seller.
            </p>
          </li>
          <li className={styles.titleIndent}>
            ARTICLE<br></br>REPRESENTATIONS AND WARRANTIES OF THE SELLER
            <p>
              The Seller hereby represents and warrants to Purchaser that as of
              the Closing Date:
            </p>
            <p>
              <b>Section 5.01. Authorization; Enforceable Obligations. </b>
              the power and authority to execute and deliver this Agreement and
              the other agreements and to perform its obligations hereunder and
              thereunder.
            </p>
            <p>
              <b>Section 5.02. Noncontravention. </b>Neither the execution and
              delivery of this Agreement, nor the consummation of the
              transactions contemplated hereby, will (a) violate any
              constitution, statute, regulation, rule, injunction, judgment,
              order, decree, ruling, charge or other restriction of any
              government, governmental agency or court to which the Seller is
              subject or any provision of the charter or bylaws of the Seller or
              (b)conflict with, result in a breach of, constitute a default
              under, result in the acceleration of or create in any party the
              right to accelerate, terminate, modify or cancel any agreement,
              contract, lease, license, instrument or other arrangement to which
              the Seller is a party or by which it is bound or to which any of
              its assets is subject (or result in the imposition of any security
              interest upon any of the Assets).
            </p>
            <p>
              <b>Section 5.03. Assumed Warranties.</b>
              <ul className={styles.listAlphabetic}>
                <li>
                  Subject to the terms and conditions of this Agreement, the
                  Seller agrees to transfer and the Purchaser agrees to assume
                  at Closing, certain agreements (such as vendor
                  agreements/relationships) to which the Seller is a party, all
                  of which are collectively referred to in this Agreement as the
                  “Assumed Warranties.”
                </li>
                <li>
                  Each Assumed Warranty to which the Seller is a party, and of
                  which the Purchaser is assuming, was duly executed and
                  delivered by, and constitutes a valid and binding obligation
                  of, the Seller, enforceable against the Seller in accordance
                  with its terms.
                </li>
                <li>
                  The Seller warrants that there has been no material breach of
                  the terms of any agreement to be assumed by the Purchaser or
                  by any other party to such agreement.
                </li>
                <li>
                  Seller warrants that it has not engaged in any activity,
                  whether intentional or otherwise, that would diminish the
                  value of any of the Assets.
                </li>
              </ul>
            </p>
            <p>
              <b>Section 5.04. Title</b>
              <br></br>
              <ul className={styles.listAlphabetic}>
                <li>
                  The Seller is the owner of good and marketable title to all of
                  the Assets, free and clear of all liabilities, liens, charges,
                  claims, licenses, rights, encumbrances, royalty obligations
                  and restrictions on transfers of any kind or nature
                  whatsoever. No financing statement covering all or any portion
                  of the Assets and naming the Seller as debtor has been filed
                  in any public office, and the Seller has not signed any
                  financing statement or security agreement as debtor or
                  borrower which financing statement or security agreement
                  covers all or any portion of the Assets.
                </li>
                <li>
                  The use of the Assets, including computer software, in the
                  conduct of Seller’s business has not and does not infringe or
                  conflict with the rights of others under any intellectual
                  property rights jurisdiction in the world.
                </li>
              </ul>
            </p>
            <p>
              <b>Section 5.05. No Disputes</b>There are no disputes, causes of
              action, claims or suits related to any of the Assets.
            </p>
          </li>
          <li className={styles.titleIndent}>
            ARTICLE<br></br>CLOSING DATE, PLACE AND TIME
            <p>
              <b>Section 6.01. Closing</b> The closing of the purchase and sale
              of the Assets (the “Closing”) shall take place at the offices of
              _______________ or in such other location as is mutually agreed to
              by the parties at ___?:??_(time zone)  on or before date, month,
              2008 (the “Closing Date”) or on such other date as mutually agreed
              to by the parties.
            </p>
          </li>
          <li className={styles.titleIndent}>
            ARTICLE<br></br>SURVIVAL OF UNDERTAKINGS
            <p>
              All of the warranties and representations of the parties hereto as
              set forth under the terms of this Agreement and the post-closing
              obligations set out in Article VIII shall survive for the longer
              of one year from the date of the Closing or the duration of time
              as set out in the applicable statute of limitations.
            </p>
          </li>
          <li className={styles.titleIndent}>
            ARTICLE<br></br>POST‑CLOSING OBLIGATIONS
            <p>
              <b>Section 8.01. Non-Compete.</b> For a period of two (3) years
              after the Effective Date, Seller shall not, within the United
              States of America become associated, directly or indirectly, with
              any entity whether as a principal, partner, employee, consultant
              or shareholder (other than as a holder of not more than 5% of the
              outstanding voting shares of any publicly traded company), whose
              business is actively engaged in competition with the business of
              the Purchaser, which business shall be defined for purposes of
              this Agreement as the online sale of eye masks and sleep
              accessories. <br></br>Included in the sales price, Seller will
              on-site training at the buyers business location of a minimum 3
              days and no more than 5 days, as well as up to 3 months of
              training and support with the Buyer, by phone and email as needed
              between the hours of 9 AM – 5 PM EST, Monday through Friday,
              excluding weekends and holidays within 48 hours of request.
            </p>
            <span>INDEMNIFICATION</span>
            <p>
              <span>Section 8.02. Indemnification by Seller. </span>Subject to
              the limitations set forth herein, Seller shall indemnify, defend,
              and hold harmless Purchaser from and against any and all claims,
              or causes of action, damages and liabilities (collectively, a
              “Loss” or “Losses”), asserted against or incurred by the Purchaser
              by reason of any breach of any representation, warranty, or
              agreement of Seller contained in or made pursuant to this
              Agreement and the other related Agreements.
            </p>
            <p>
              <span>Section 8.03. Indemnification by Purchaser. </span>Subject
              to the limitations set forth herein, Purchaser shall indemnify,
              defend, and hold harmless Seller and its subsidiaries, from and
              against any and all Losses asserted against or incurred by the
              Seller by reason of any breach of any representation, warranty, or
              agreement of Purchaser contained in or made pursuant to this
              Agreement or the related agreements and instruments contemplated
              hereby and thereby, any of the Assumed Liabilities, and the
              ownership and operation of the Assets from and after the Closing
              Date.
            </p>
            <p>
              <span>Section 8.04. Notice of Claim. </span>The party entitled to
              indemnification hereunder (the “Claimant”) shall promptly deliver
              to the party liable for such indemnification hereunder (the
              “Obligor”) notice in writing (the “Required Notice”) of any claim
              for recovery under Section 9.01 or 9.02, specifying in reasonable
              detail the nature of the Loss, and, if known, the amount, or an
              estimate of the amount, of the liability arising therefrom (the
              “Claim”). The Claimant shall provide to the Obligor as promptly as
              practicable thereafter information and documentation reasonably
              requested by the Obligor to support and verify the claim asserted,
              provided that, in so doing, it may restrict or condition any
              disclosure in the interest of preserving privileges of importance
              in any foreseeable litigation.
            </p>
            <p>
              <span>Section 8.05. Defense. </span>If the facts pertaining to the
              Loss arise out of the claim of any third party and indemnification
              is available by virtue of the circumstances of the Loss, the
              Obligor may assume the defense or the prosecution thereof,
              including the employment of counsel or accountants, at its cost
              and expense. If representation of both the Obligor and the
              Claimant by such counsel would be inappropriate due to actual or
              potential differing interests between the Obligor and the Claimant
              in such proceeding (such as the availability of defenses to the
              Claimant), the Claimant (together with all other indemnified
              parties which may be represented without conflict by one counsel)
              shall have the right to retain one separate counsel, with the
              reasonable fees and expenses to be paid by the Obligor. The
              Claimant shall have the right to determine and adopt (or, in the
              case of a proposal by Obligor, to approve) a settlement of such
              matter in its reasonable discretion, except that Claimant need not
              consent to any settlement other than one that (a) imposes any
              non-monetary obligation upon Claimant or (b) Obligor does not
              agree to pay in full. The Obligor shall not be liable for any
              settlement of any such claim effected without its prior written
              consent, which shall not be unreasonably withheld, delayed or
              conditioned. Whether or not the Obligor elects to so defend or
              prosecute such claim, all the parties hereto shall cooperate in
              the defense or prosecution thereof and shall furnish such records,
              information, and testimony, and attend such conferences, discovery
              proceedings, hearings, trials, and appeals, as may be reasonably
              requested in connection therewith.
            </p>
            <p>
              <span>Section 8.06. Limitations. </span>Notwithstanding anything
              in this Article IX to the contrary, no indemnification or any
              other claim for damages under this Agreement or any other
              instrument or agreement to be executed and delivered by the
              parties hereto in connection with the transactions contemplated
              hereby shall be payable by any party to any other party until (and
              then only to the extent that) the total of all Losses from such
              claim equals or exceeds $10,000.
            </p>
          </li>
          <li className={styles.titleIndent}>
            ARTICLE<br></br>MISCELLANEOUS
            <p>
              <b>Section 10.01. Expenses.</b> Purchaser shall pay its own
              expenses incidental to the preparation of this Agreement, the
              carrying out of the provisions of this Agreement and the
              consummation of the transactions contemplated hereby. This will
              include, legal, accounting, travel and lodging, etc if and when
              needed to complete this agreement. Seller shall not pay any
              expenses incidental to the preparation of this Agreement, the
              carrying out of the provisions of this Agreement and the
              consummation of the transactions contemplated hereby.
            </p>
            <p>
              <b>
                Section 9.01. Contents of Agreement; Parties in Interest; etc.
              </b>
              This Agreement, which includes the schedules, exhibits and the
              other documents, agreements, certificates and instruments executed
              and delivered pursuant to this Agreement sets forth the entire
              understanding and agreement of the parties hereto with respect to
              the transactions contemplated hereby.
            </p>
            <p>
              <b>Section 9.02. Waiver.</b>
              Any term or provision of this Agreement may be waived at any time
              by the party entitled to the benefit thereof by a written
              instrument duly executed by such party.
            </p>
            <p>
              <b>Section 9.03. Notices.</b>
              Any notice, request, demand, waiver, consent, approval or other
              communication which is required or permitted hereunder shall be in
              writing and shall be deemed given only if delivered personally or
              sent by telecopier, air courier or by registered or certified
              mail, postage prepaid, as follows:
              <br></br>If to the Purchaser:<br></br>If to Seller, to:<br></br>or
              to such other address as the addressee may have specified in a
              notice duly given to the sender as provided herein. Such notice,
              request, demand, waiver, consent, approval or other communication
              will be deemed to have been given as of the date so delivered,
              transmitted by facsimile, telegraphed or mailed, as the case may
              be.
            </p>
            <p>
              <b>Section 9.04. Headings.</b>
              All section headings contained in this Agreement are for
              convenience of reference only, do not form a part of this
              Agreement and shall not affect in any way the meaning or
              interpretation of this Agreement.
            </p>
            <p>
              <b>Section 9.05. Exhibits.</b>
              All exhibits referred to herein are incorporated herein by
              reference and are intended to be and hereby are specifically made
              a part of this Agreement.
            </p>
            <p>
              <b>Section 9.06. Severability.</b>
              The invalidity or unenforceability of any provision of this
              Agreement in any jurisdiction shall not invalidate or render
              unenforceable such provision in any other jurisdiction.
            </p>
            <p>
              <b>Section 9.07. Counterparts.</b>
              This Agreement may be executed in any number of counterparts, each
              of which when executed and delivered shall be deemed to be an
              original and all of which counterparts taken together shall
              constitute but one and the same instrument.
            </p>
            <p>
              <b>Section 9.08. Execution by Facsimile.</b>
              Any party may deliver an executed copy of this Agreement and any
              documents contemplated hereby by facsimile transmission to another
              party, and such delivery shall have the same force and effect as
              any other delivery of a manually signed copy of this Agreement or
              of such other documents.
            </p>
            <p>
              <b>Section 9.09. Choice of Law.</b>
              This Agreement shall be governed by, and construed in accordance
              with, the internal laws of the State of _________. Any legal
              action or proceeding with respect to this Agreement or any
              document related hereto shall be brought only in the district
              courts of __________, or the United States District Court for
              _________, and, by execution and delivery of this Agreement, each
              party hereto hereby accepts for itself and in respect of its
              property, generally and unconditionally, the jurisdiction of the
              aforesaid courts. The parties hereto hereby irrevocably waive any
              objection, including, without limitation, any forum non
              conveniens, which any of them may now or hereafter have to the
              bringing of such action or proceeding in such respective
              jurisdictions.<br></br>
              <i>(signatures on following page)</i>
            </p>
            <p>
              IN WITNESS WHEREOF, the parties hereto have duly executed this
              Asset Purchase Agreement on the date first written above.
            </p>
            <div>
              <table style={{ width: '100%' }}>
                <tr>
                  <td style={{ width: '50%' }}></td>
                  <td style={{ width: '50%', textAlign: 'left' }}>
                    <div>PURCHASER:</div>
                    <br></br>
                    <div>By__________________</div>
                    <div>Name________________</div>
                    <br></br>
                    <div>Title________________</div>
                    <div>Date_________________</div>
                    <br></br>
                    <br></br>
                    <div>SELLER:</div>
                    <br></br>
                    <div>By__________________</div>
                    <div>Date________________</div>
                    <br></br>
                    <div>Title________________</div>
                    <div>Date_________________</div>
                  </td>
                </tr>
              </table>
            </div>
          </li>
        </ul>
        <ul className={styles.listRomain}>
          <li className={styles.titleIndent}>
            EXHIBIT A<br></br>Inventory<br></br>
            <p className={styles.centered}>
              Include list of inventory being granted at your expense.
            </p>
          </li>
          <li className={styles.titleIndent}>
            EXHIBIT B<br></br>intangible property<br></br>
            <p>Owned:</p>
            <ul className={styles.listAlphabetic}>
              <li>
                The tradename ______________, together with any trademark rights
                which Seller has or may have in the tradename and any goodwill
                of the business symbolized by the tradename
              </li>
              <li>Other tradenames and trademarks included here</li>
              <li>
                The domain name ___________ which shall be transferred pursuant
                to the Domain Name Purchase Agreement between Purchaser and
                Seller dated as of _______, 2008, a form of which is attached to
                the Asset Purchase Agreement as Exhibit F
              </li>
            </ul>
          </li>
          <li className={styles.titleIndent}>
            EXHIBIT C<br></br>databases AND OTHER ASSETS<br></br>
            <ul className={styles.listAlphabetic}>
              <li>Databases.</li>
              <li>
                Website content and all related electronic and hard copy files.
              </li>
              <li>
                Shopping Cart System(s), content and all related files, and
                software
              </li>
              <li>Order Processing Software</li>
              <li>Packaging, Logos, etc</li>
              <li>Other assets:</li>
              <li>Supplier Agreements/Customer Contracts</li>
            </ul>
          </li>
          <li className={styles.titleIndent}>
            EXHIBIT E<br></br>FORM OF BILL OF SALE<br></br>
            <p className={styles.centered}>
              __________, [Registered State] company (“Seller”), pursuant to
              certain Asset Purchase Agreement (the “Purchase Agreement”) dated
              as of __________, 2008 between _______________________
              (“Purchaser”) and Seller, for good and valuable consideration, the
              receipt and sufficiency of which are hereby acknowledged, hereby
              sells, conveys, transfers, and assigns to Purchaser, and its
              successors and assigns, all right, title and interest of Seller in
              and to all of the assets (collectively, the “Assets”) as listed on
              Exhibits A, B and C to the Purchase Agreement attached hereto.
              <br></br>This Bill of Sale is executed pursuant to the Purchase
              Agreement. Reference is hereby made to the Purchase Agreement for
              a complete statement of all representations, warranties and
              covenants of Seller, and all limitations thereon, with respect to
              the Inventory, all of which are incorporated herein by reference
              and are hereby remade and survive the delivery of this Bill of
              Sale to the extent provided in the Purchase Agreement.<br></br>
              Seller warrants to Purchaser that Seller is the sole owner of the
              Assets, that Seller has the right to bargain, sell, assign,
              transfer and convey the Assets, and that the Assets are free and
              clear of all mortgages, liens, pledges, security interests,
              interests, charges, claims, encumbrances and restrictions on
              transfer which would substantially interfere with the Purchaser’s
              use thereof.<br></br>IN WITNESS WHEREOF, Seller has executed this
              Bill of Sale as of _________, 2008.
            </p>
            <div>
              <table style={{ width: '100%' }}>
                <tr>
                  <td style={{ width: '50%' }}></td>
                  <td style={{ width: '50%', textAlign: 'left' }}>
                    <br></br>
                    <div>By__________________</div>
                    <div>Name________________</div>
                    <br></br>
                    <div>Title________________</div>
                    <div>Date_________________</div>
                  </td>
                </tr>
              </table>
            </div>
          </li>
          <li className={styles.titleIndent}>
            EXHIBIT F<br></br>DOMAIN NAME ASSIGNMENT AGREEMENT
            <br></br>
            <ul className={styles.listNumber}>
              <li>
                Transfer and Assignment<br></br>
                <ul className={styles.listAlphabetic}>
                  <li>
                    Assignor hereby assigns and transfers to Assignee all
                    claims, rights, title and interest Assignor has or may have
                    in the registered domain names identified in Schedule 1,
                    attached hereto and incorporated by this reference
                    (collectively, the “Domain Names”) subject to the terms set
                    forth in this Assignment. Without limiting the foregoing,
                    Assignor hereby assigns and transfers to Assignee any
                    trademark rights which Assignor has or may have in the
                    Domain Names, including all rights, title, and interest in
                    and to the trademarks together with any goodwill symbolized
                    by the trademarks, and all content, including all copyright
                    materials, posted at the website(s) operating at the Domain
                    Names. Assignor represents and warrants that it owns all
                    rights, title and interest in and to the Domain Names free
                    and clear of all liens and encumbrances, that it has not
                    entered into any prior agreements with third parties that
                    would preclude it from conveying the rights granted herein,
                    and that it has not engaged in any activity, intentional or
                    otherwise, which would diminish the value of such Domain
                    Names.
                  </li>
                  <li>
                    Immediately upon execution of this Assignment, Assignor will
                    cooperate with Assignee as reasonably requested by Assignee
                    to assist Assignee to effectuate the transfer of the Domain
                    Names to Assignee. Assignor agrees to cooperate with
                    Assignee in executing all documents and doing all things
                    that Assignee considers necessary or desirable to further
                    the purposes of this Assignment, including executing any
                    registration name change agreements required by the
                    appropriate or other domain name registries.
                  </li>
                  <li>
                    Assignor agrees not to adopt or register any domain names,
                    trademarks or business identifiers, including key words,
                    confusingly similar to the Domain Names in any registry or
                    other entity in any country.
                  </li>
                </ul>
              </li>
              <li>
                Consideration<br></br>Assignor acknowledges and agrees that
                payment of the amount set forth in the Asset Purchase Agreement
                between Assignee and Assignor dated as of __, 2007 (the “Asset
                Purchase Agreement”) in connection with the purchase by Assignee
                and sale by Assignor of the Assets listed in Exhibit A, B and C
                of the Asset Purchase Agreement constitutes the full and
                complete consideration due to Assignee hereunder, and no other
                payments shall be due or recoverable by Assignee related to this
                Assignment.<br></br>
                <i>[Signature lines on following page]</i>
                <div>
                  <table style={{ width: '100%', marginTop: '2em' }}>
                    <tr>
                      <td style={{ width: '50%', textAlign: 'left' }}>
                        <div>Assignor</div>
                        <br></br>
                        <div>_______________________________</div>
                        <div>Signature</div>
                        <br></br>
                        <div>_______________________________</div>
                        <div>Printed Name</div>
                        <br></br>
                        <div>_______________________________</div>
                        <div>Title</div>
                        <br></br>
                        <div>_______________________________</div>
                        <div>Date</div>
                      </td>
                      <td style={{ width: '50%', textAlign: 'left' }}>
                        <div>Assignee</div>
                        <br></br>
                        <div>_______________________________</div>
                        <div>Signature</div>
                        <br></br>
                        <div>_______________________________</div>
                        <div>Printed Name</div>
                        <br></br>
                        <div>_______________________________</div>
                        <div>Title</div>
                        <br></br>
                        <div>_______________________________</div>
                        <div>Date</div>
                      </td>
                    </tr>
                  </table>
                </div>
              </li>
            </ul>
          </li>
        </ul>
        <h2 className={styles.centered}>SCHEDULE 1</h2>
        <h2 className={styles.centered}>ASSIGNED DOMAIN NAMES</h2>
      </div>
    </div>
  );
};
export default PurchaseAgreement;
