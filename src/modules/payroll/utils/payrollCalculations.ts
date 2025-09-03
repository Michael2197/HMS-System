// Function to calculate tier based on annual tax amount (O2 in the equation)
export const calculateTier = (annualTaxAmount: number): string => {
  if (annualTaxAmount <= 40000) {
    return "شريحة معفاه";
  } else if (annualTaxAmount <= 55000) {
    return "شريحة ثانية";
  } else if (annualTaxAmount <= 70000) {
    return "شريحة ثالثة";
  } else if (annualTaxAmount <= 200000) {
    return "شريحة رابعة";
  } else if (annualTaxAmount <= 400000) {
    return "شريحة خامسة";
  } else if (annualTaxAmount <= 600000) {
    return "شريحة سادسة";
  } else if (annualTaxAmount <= 700000) {
    return "شريحة سادسة أ";
  } else if (annualTaxAmount <= 800000) {
    return "شريحة سادسة ب";
  } else if (annualTaxAmount <= 900000) {
    return "شريحة سادسة ج";
  } else if (annualTaxAmount <= 1200000) {
    return "شريحة سادسة د";
  } else {
    return "شريحة سابعة";
  }
};

export const calculatePayroll = (record: {
  employeeName: string;
  jobTitle: string;
  grossSalary: number; // المرتب الشهري
}) => {
  const insuranceSalary = Math.min(record.grossSalary, 14500);
  const companyShare = Math.ceil(insuranceSalary * 0.1875); // حصة الشركة
  const employeeShare = insuranceSalary * 0.11; // حصة الموظف
  const solidarity = record.grossSalary * 0.0005; // مساهمة تكافل (بتتسجل فقط)
  const personalExemption = 20000 / 12;
  const personalExemptionForPeriod = 20000 / 12;

  // K2 = Net after Insurance
  const netAfterInsurance = record.grossSalary - employeeShare;

  // الوعاء الضريبي الشهري
  const taxableBase = Math.max(0, record.grossSalary - employeeShare - personalExemption);

  // حساب الضريبة السنوية
  let annualTax = 0;
  const N2 = taxableBase * 12;

  if (N2 <= 40000) {
    annualTax = 0;
  } else if (N2 <= 55000) {
    annualTax = (N2 - 40000) * 0.10;
  } else if (N2 <= 70000) {
    annualTax = (N2 - 55000) * 0.15 + 1500;
  } else if (N2 <= 200000) {
    annualTax = (N2 - 70000) * 0.20 + 1500 + 2250;
  } else if (N2 <= 400000) {
    annualTax = (N2 - 200000) * 0.225 + 1500 + 2250 + 26000;
  } else if (N2 <= 600000) {
    annualTax = (N2 - 400000) * 0.25 + 1500 + 2250 + 26000 + 45000;
  } else if (N2 <= 700000) {
    annualTax = (N2 - 400000) * 0.25 + 5500 + 2250 + 26000 + 45000;
  } else if (N2 <= 800000) {
    annualTax = (N2 - 400000) * 0.25 + 10500 + 26000 + 45000;
  } else if (N2 <= 900000) {
    annualTax = (N2 - 400000) * 0.25 + 40000 + 45000;
  } else if (N2 <= 1200000) {
    annualTax = (N2 - 400000) * 0.25 + 90000;
  } else if (N2 > 1200000) {
    annualTax = (N2 - 1200000) * 0.275 + 300000;
  }

  // Q2 = الضريبة الشهرية المحجوزة
  const monthlyTax = annualTax / 12;

  //  Final Net 
  let finalSalary = Math.round(netAfterInsurance - monthlyTax);

  
  

  const withheldPayrollTax = monthlyTax;
  const tier = calculateTier(annualTax);

  return {
    ...record,
    insuranceSalary,
    companyInsuranceShare: companyShare,
    employeeInsuranceShare: employeeShare,
    solidarityContribution: solidarity, // موجود كرقم منفصل
    personalExemption,
    personalExemptionForPeriod,
    netSalaryAfterInsurance: netAfterInsurance, // K2
    taxableBaseForPeriod: taxableBase,
    annualBase: N2,
    annualTax,
    monthlyTaxWithheld: monthlyTax, // Q2
    withheldPayrollTax,
    finalNetSalary: finalSalary, // ✅ K2 - Q2
    tier,
  };
};
