using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BenefitsEstimater.Models
{
    //Drop and create the database on startup. Only for development as we dont want to rebase the database everytime we deploy
    public class BenefitsEstimaterContextInitializer : System.Data.Entity.DropCreateDatabaseAlways<BenefitsEstimaterContext>
    {
        protected override void Seed(BenefitsEstimaterContext context)
        {
            //Seed the database with the initial employee. Bob will be entering everyone right now.
            context.employees.Add(new employee { Name = "Bob" });
            base.Seed(context);
        }
    }


}