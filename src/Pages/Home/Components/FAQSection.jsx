

const FAQSection = () => {
  

    return (
      <div className="py-10 mt-20  rounded-xl">
        <div className="container mx-auto">
          <h2 className="text-5xl text-black underline uppercase font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-10 ">
            <div className="collapse collapse-plus bg-green-100">
              <input type="radio" name="my-accordion-3" checked="checked" />
              <div className="collapse-title text-xl font-medium">
                How can I upgrade my plan?
              </div >
              <div className="collapse-content">
                <p>
                  You can easily upgrade your plan by logging into your account
                  and selecting the desired plan in the subscription settings.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-green-100">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Is there a trial period for Premium plans?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, Premium Individual and Premium Duo plans come with a
                  1-month free trial period.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-green-100">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Can I change my billing information?
              </div>
              <div className="collapse-content">
                <p>
                  Yes, you can update your billing information in the account
                  settings on our website.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-green-100">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Are there any additional fees for premium batches?
              </div>
              <div className="collapse-content">
                <p>
                  No, access to premium batches is included in the Premium Duo
                  plan at no additional cost.
                </p>
              </div>
            </div>
            <div className="collapse collapse-plus bg-green-100">
              <input type="radio" name="my-accordion-3" />
              <div className="collapse-title text-xl font-medium">
                Yes, we offer student discounts. You can verify your student
                status and enjoy Premium Individual at a discounted rate.
              </div>
              <div className="collapse-content">
                <p>
                  No, access to premium batches is included in the Premium Duo
                  plan at no additional cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default FAQSection;
