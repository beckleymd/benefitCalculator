using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitsEstimater.Models
{
    public class BenefitsEstimaterContextInitializer : System.Data.Entity.DropCreateDatabaseAlways<BenefitsEstimaterContext>
    {
        protected override void Seed(BenefitsEstimaterContext context)
        {
            context.employees.Add(new employee { Name = "Bob" });
            base.Seed(context);
        }
    }


}