<template>
  <Breadcrumbs :pages="pages" />
  <div class="p-10 h-5/6">
    <div class="md:grid md:grid-cols-3 md:gap-6 h-full">
      <div class="md:col-span-1">
        <nav aria-label="Progress" class="flex flex-1 items-center">
          <ol class="overflow-hidden">
            <li
              v-for="(step, stepIdx) in steps"
              :key="step.name"
              :class="[stepIdx !== steps.length - 1 ? 'pb-10' : '', 'relative']"
            >
              <template v-if="step.status === 'complete'">
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="
                    -ml-px
                    absolute
                    mt-0.5
                    top-4
                    left-4
                    w-0.5
                    h-full
                    bg-indigo-600
                  "
                  aria-hidden="true"
                />
                <button
                  @click="stepperClick(stepIdx)"
                  class="relative flex items-start group focus:outline-none"
                  type="button"
                >
                  <span class="h-9 flex items-center">
                    <span
                      class="
                        relative
                        z-10
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                        bg-indigo-600
                        rounded-full
                        group-hover:bg-indigo-800
                      "
                    >
                      <CheckIcon
                        class="w-5 h-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                  <span class="ml-4 min-w-0 flex flex-col text-left">
                    <span
                      class="text-xs font-semibold tracking-wide uppercase"
                      >{{ step.name }}</span
                    >
                    <span class="text-sm text-gray-500">{{
                      step.description
                    }}</span>
                  </span>
                </button>
              </template>
              <template
                v-else-if="step.status === 'current'"
                condition="step.status === 'current'"
              >
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="
                    -ml-px
                    absolute
                    mt-0.5
                    top-4
                    left-4
                    w-0.5
                    h-full
                    bg-gray-300
                  "
                  aria-hidden="true"
                />
                <button
                  @click="stepperClick(stepIdx)"
                  type="button"
                  class="relative flex items-start group focus:outline-none"
                  aria-current="step"
                >
                  <span class="h-9 flex items-center" aria-hidden="true">
                    <span
                      class="
                        relative
                        z-10
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                        bg-white
                        border-2 border-indigo-600
                        rounded-full
                      "
                    >
                      <span class="h-2.5 w-2.5 bg-indigo-600 rounded-full" />
                    </span>
                  </span>
                  <span class="ml-4 min-w-0 flex flex-col text-left">
                    <span
                      class="
                        text-xs
                        font-semibold
                        tracking-wide
                        uppercase
                        text-indigo-600
                      "
                      >{{ step.name }}</span
                    >
                    <span class="text-sm text-gray-500">{{
                      step.description
                    }}</span>
                  </span>
                </button>
              </template>
              <template v-else>
                <div
                  v-if="stepIdx !== steps.length - 1"
                  class="
                    -ml-px
                    absolute
                    mt-0.5
                    top-4
                    left-4
                    w-0.5
                    h-full
                    bg-gray-300
                  "
                  aria-hidden="true"
                />
                <button
                  @click="stepperClick(stepIdx)"
                  type="button"
                  class="relative flex items-start group focus:outline-none"
                >
                  <span class="h-9 flex items-center" aria-hidden="true">
                    <span
                      class="
                        relative
                        z-10
                        w-8
                        h-8
                        flex
                        items-center
                        justify-center
                        bg-white
                        border-2 border-gray-300
                        rounded-full
                        group-hover:border-gray-400
                      "
                    >
                      <span
                        class="
                          h-2.5
                          w-2.5
                          bg-transparent
                          rounded-full
                          group-hover:bg-gray-300
                        "
                      />
                    </span>
                  </span>
                  <span class="ml-4 min-w-0 flex flex-col text-left">
                    <span
                      class="
                        text-xs
                        font-semibold
                        tracking-wide
                        uppercase
                        text-gray-500
                      "
                      >{{ step.name }}</span
                    >
                    <span class="text-sm text-gray-500">{{
                      step.description
                    }}</span>
                  </span>
                </button>
              </template>
            </li>
          </ol>
        </nav>
      </div>
      <div class="mt-5 md:mt-0 md:col-span-2 overflow-y-auto">
        <form>
          <div class="shadow overflow-hidden sm:rounded-md">
            <div
              class="px-4 py-5 bg-white space-y-6 sm:p-6 border"
              v-show="currentStep == 0"
            >
              <div class="grid grid-cols-6 gap-6">
                <!-- step 1 -->
                <div class="col-span-6">
                  <label
                    for="legal_name"
                    class="block text-sm font-medium text-gray-700"
                    >Legal Name</label
                  >
                  <input
                    type="text"
                    autocomplete="legal_name"
                    v-model="merchant.merchantInformation.name"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                    required
                  />
                </div>
                <div class="col-span-6">
                  <label for="" class="block text-sm font-medium text-gray-700"
                    >Business Name (DBA)</label
                  >
                  <input
                    type="text"
                    autocomplete="business_name"
                    v-model="merchant.merchantInformation.businessName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                    required
                  />
                </div>
              </div>
            </div>
            <div
              class="px-4 py-5 bg-white sm:p-6 border"
              v-show="currentStep == 1"
            >
              <div class="grid grid-cols-6 gap-6">
                <!-- step 2 -->
                <div class="col-span-6 -mb-10">
                  <h2
                    class="
                      text-gray-900 text-xs
                      font-semibold
                      uppercase
                      tracking-wide
                    "
                  >
                    Legal Address
                  </h2>
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="street_address"
                    class="block text-sm font-medium text-gray-700"
                    >Street Address</label
                  >
                  <input
                    type="text"
                    name="street_address"
                    v-model="merchant.corporateAddress.streetAddress"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >City</label
                  >
                  <input
                    type="text"
                    name="city"
                    v-model="merchant.corporateAddress.city"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >State</label
                  >
                  <input
                    type="text"
                    name="state"
                    v-maska="'AA'"
                    v-model="merchant.corporateAddress.state"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                    required
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="zip_code"
                    class="block text-sm font-medium text-gray-700"
                    >Zip Code</label
                  >
                  <input
                    type="text"
                    name="zip_code"
                    v-maska="'#####'"
                    v-model="merchant.corporateAddress.zipCode"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >Country</label
                  >
                  <input
                    type="text"
                    name="country"
                    v-model="merchant.corporateAddress.country"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="phone_number"
                    class="block text-sm font-medium text-gray-700"
                    >Corporate Phone Number</label
                  >
                  <input
                    type="text"
                    name="phone_number"
                    v-maska="'(###) ###-####'"
                    v-model="merchant.corporateAddress.phoneNumber"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="fax_number"
                    class="block text-sm font-medium text-gray-700"
                    >Fax Number</label
                  >
                  <input
                    type="text"
                    name="fax_number"
                    v-maska="'(###) ###-####'"
                    v-model="merchant.corporateAddress.faxNumber"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6">
                  <div class="flex items-center pt-2">
                    <div class="flex items-center h-5">
                      <input
                        v-model="isSameAddress"
                        type="checkbox"
                        class="
                          focus:ring-indigo-500
                          h-4
                          w-4
                          text-indigo-600
                          border-gray-300
                          rounded
                        "
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="comments"
                        class="font-medium text-xs text-gray-700"
                        >Is same as Physical Address?</label
                      >
                    </div>
                  </div>
                </div>
                <div v-show="!isSameAddress" class="col-span-6 grid gap-6">
                  <hr class="col-span-6 -mx-6" />

                  <div class="col-span-6 -mb-10">
                    <h2
                      class="
                        text-gray-900 text-xs
                        font-semibold
                        uppercase
                        tracking-wide
                      "
                    >
                      Physical Address
                    </h2>
                  </div>
                  <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label
                      for="street_address"
                      class="block text-sm font-medium text-gray-700"
                      >Street Address</label
                    >
                    <input
                      type="text"
                      name="street_address"
                      v-model="merchant.physicalAddress.streetAddress"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label
                      for="city"
                      class="block text-sm font-medium text-gray-700"
                      >City</label
                    >
                    <input
                      type="text"
                      name="city"
                      v-model="merchant.physicalAddress.city"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label
                      for="city"
                      class="block text-sm font-medium text-gray-700"
                      >State</label
                    >
                    <input
                      type="text"
                      name="state"
                      v-maska="'AA'"
                      v-model="merchant.physicalAddress.state"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label
                      for="zip_code"
                      class="block text-sm font-medium text-gray-700"
                      >Zip Code</label
                    >
                    <input
                      type="text"
                      name="zip_code"
                      v-maska="'#####'"
                      v-model="merchant.physicalAddress.zipCode"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label
                      for="city"
                      class="block text-sm font-medium text-gray-700"
                      >Country</label
                    >
                    <input
                      type="text"
                      name="country"
                      v-model="merchant.physicalAddress.country"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label
                      for="phone_number"
                      class="block text-sm font-medium text-gray-700"
                      >Corporate Phone Number</label
                    >
                    <input
                      type="text"
                      name="phone_number"
                      v-maska="'(###) ###-####'"
                      v-model="merchant.physicalAddress.phoneNumber"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label
                      for="fax_number"
                      class="block text-sm font-medium text-gray-700"
                      >Fax Number</label
                    >
                    <input
                      type="text"
                      name="fax_number"
                      v-maska="'(###) ###-####'"
                      v-model="merchant.physicalAddress.faxNumber"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              class="px-4 py-5 bg-white space-y-6 sm:p-6 border"
              v-show="currentStep == 2"
            >
              <div class="grid grid-cols-6 gap-6">
                <!-- step 3 -->
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="owner1_first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Owner 1 First Name</label
                  >
                  <input
                    type="text"
                    name="owner1_first_name"
                    v-model="merchant.businessInformation.owner1FirstName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >Owner 1 Last Name</label
                  >
                  <input
                    type="text"
                    name="owner1_last_name"
                    v-model="merchant.businessInformation.owner1LastName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="owner2_first_name"
                    class="block text-sm font-medium text-gray-700"
                    >Owner 2 First Name</label
                  >
                  <input
                    type="text"
                    name="state"
                    v-model="merchant.businessInformation.owner2FirstName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="owner2_last_name"
                    class="block text-sm font-medium text-gray-700"
                    >Owner 2 Last Name</label
                  >
                  <input
                    type="text"
                    name="owner2_last_name"
                    v-model="merchant.businessInformation.owner2LastName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="city"
                    class="block text-sm font-medium text-gray-700"
                    >Primary Contact Name</label
                  >
                  <input
                    type="text"
                    name="country"
                    v-model="merchant.businessInformation.primaryContactName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="title"
                    class="block text-sm font-medium text-gray-700"
                    >Title</label
                  >
                  <input
                    type="text"
                    name="phone_number"
                    v-model="merchant.businessInformation.title"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="business_entity"
                    class="block text-sm font-medium text-gray-700"
                    >Business Entity</label
                  >
                  <select
                    required
                    v-model="business_entity"
                    class="
                      mt-1
                      block
                      w-full
                      py-2
                      px-3
                      border border-gray-300
                      bg-white
                      rounded-md
                      shadow-sm
                      focus:outline-none
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      sm:text-sm
                    "
                  >
                    <option
                      v-for="(businessEntity, index) in businessEntities"
                      :key="index"
                      :value="businessEntity"
                    >
                      {{ businessEntity.name }}
                    </option>
                  </select>
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="business_formation"
                    class="block text-sm font-medium text-gray-700"
                    >Business Formation</label
                  >
                  <div class="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="date"
                      name="business_formation"
                      v-model="business_formation"
                      class="
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                  <p class="italic mt-1 text-xs">
                    Time of Business:
                    {{
                      moment().diff(
                        merchant.businessInformation.businessFormationDate,
                        "years"
                      )
                    }}
                    years
                  </p>
                </div>

                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="federal_tax_id_number"
                    class="block text-sm font-medium text-gray-700"
                    >Federal Tax ID Number</label
                  >
                  <input
                    type="text"
                    name="phone_number"
                    v-model="merchant.businessInformation.idNumber"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>

                <div
                  class="
                    col-span-6
                    sm:col-span-6
                    lg:col-span-3
                    grid grid-cols-2
                    gap-4
                  "
                >
                  <label
                    for="federal_tax_id_number"
                    class="block text-sm font-medium text-gray-700 col-span-2"
                    >TIN Type</label
                  >
                  <div class="flex items-center">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      v-model="merchant.businessInformation.tinType"
                      type="radio"
                      class="
                        focus:ring-indigo-500
                        h-4
                        w-4
                        text-indigo-600
                        border-gray-300
                      "
                      value="ssn"
                    />
                    <label
                      for="push-everything"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      SSN
                    </label>
                  </div>
                  <div class="flex items-center">
                    <input
                      id="push-everything"
                      name="push-notifications"
                      v-model="merchant.businessInformation.tinType"
                      type="radio"
                      class="
                        focus:ring-indigo-500
                        h-4
                        w-4
                        text-indigo-600
                        border-gray-300
                      "
                      value="ein"
                    />
                    <label
                      for="push-everything"
                      class="ml-3 block text-sm font-medium text-gray-700"
                    >
                      EIN
                    </label>
                  </div>
                </div>

                <div class="col-span-6">
                  <div class="flex items-center pt-2">
                    <div class="flex items-center h-5">
                      <input
                        type="checkbox"
                        v-model="isStateRegulatory"
                        class="
                          focus:ring-indigo-500
                          h-4
                          w-4
                          text-indigo-600
                          border-gray-300
                          rounded
                        "
                      />
                    </div>
                    <div class="ml-3 text-sm">
                      <label
                        for="comments"
                        class="font-medium text-xs text-gray-700"
                        >Is State-Issued Regulatory or Business Licensed?</label
                      >
                    </div>
                  </div>
                </div>

                <div
                  class="col-span-6 grid grid-cols-6 gap-6"
                  v-show="isStateRegulatory"
                >
                  <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label
                      for="federal_tax_id_number"
                      class="block text-sm font-medium text-gray-700"
                      >License Number</label
                    >
                    <input
                      type="text"
                      name="phone_number"
                      v-model="merchant.businessInformation.businessLicense"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>

                  <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                    <label
                      for="federal_tax_id_number"
                      class="block text-sm font-medium text-gray-700"
                      >State</label
                    >
                    <input
                      type="text"
                      name="state"
                      v-model="
                        merchant.businessInformation.businessLicenseState
                      "
                      v-maska="'AA'"
                      class="
                        mt-1
                        focus:ring-indigo-500
                        focus:border-indigo-500
                        block
                        w-full
                        shadow-sm
                        sm:text-sm
                        border-gray-300
                        rounded-md
                      "
                    />
                  </div>
                </div>
              </div>

              <div class="col-span-6">
                <div class="flex items-center pt-2">
                  <div class="flex items-center h-5">
                    <input
                      type="checkbox"
                      v-model="hasMultipleLocations"
                      class="
                        focus:ring-indigo-500
                        h-4
                        w-4
                        text-indigo-600
                        border-gray-300
                        rounded
                      "
                    />
                  </div>
                  <div class="ml-3 text-sm">
                    <label
                      for="comments"
                      class="font-medium text-xs text-gray-700"
                      >Has multiple locations?</label
                    >
                  </div>
                </div>
              </div>

              <div
                class="col-span-6 grid grid-cols-6 gap-6"
                v-show="hasMultipleLocations"
              >
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="federal_tax_id_number"
                    class="block text-sm font-medium text-gray-700"
                    >Number of Locations</label
                  >
                  <input
                    type="text"
                    name="phone_number"
                    v-model="merchant.businessInformation.numberOfLocations"
                    v-maska="'#######'"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
              </div>
            </div>

            <div
              class="px-4 py-5 bg-white space-y-6 sm:p-6 border"
              v-show="currentStep == 3"
            >
              <div class="grid grid-cols-6 gap-6">
                <!-- step 1 -->
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="bank_name"
                    class="block text-sm font-medium text-gray-700"
                    >Bank Name</label
                  >
                  <input
                    type="text"
                    autocomplete="bank_name"
                    v-model="merchant.merchantInformation.bankName"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="bank_type"
                    class="block text-sm font-medium text-gray-700"
                    >Bank Account Type</label
                  >
                  <select
                    required
                    v-model="merchant.merchantInformation.bankType"
                    class="
                      mt-1
                      block
                      w-full
                      py-2
                      px-3
                      border border-gray-300
                      bg-white
                      rounded-md
                      shadow-sm
                      focus:outline-none
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      sm:text-sm
                    "
                  >
                    <option value="SAVINGS">Savings Account</option>
                    <option value="CHECKING">Checking Account</option>
                  </select>
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="bank_account_number"
                    class="block text-sm font-medium text-gray-700"
                    >Bank Account Number</label
                  >
                  <input
                    type="text"
                    autocomplete="bank_account_number"
                    v-model="merchant.merchantInformation.bankAccountNumber"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
                <div class="col-span-6 sm:col-span-6 lg:col-span-3">
                  <label
                    for="bank_account_routing_number"
                    class="block text-sm font-medium text-gray-700"
                    >Bank Account Routing Number</label
                  >
                  <input
                    type="text"
                    autocomplete="bank_account_routing_number"
                    v-model="
                      merchant.merchantInformation.bankAccountRountingNumber
                    "
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                  />
                </div>
              </div>
            </div>

            <div
              class="px-4 py-5 bg-white space-y-6 sm:p-6 border"
              v-show="currentStep == 4"
            >
              <div class="grid grid-cols-6 gap-6">
                <!-- step 1 -->
                <div class="col-span-6">
                  <label
                    for="sales_agent1"
                    class="block text-sm font-medium text-gray-700"
                    >Sales Agent 1</label
                  >
                  <input
                    type="text"
                    autocomplete="sales_agent1"
                    v-model="merchant.merchantInformation.salesAgent1"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                    required
                  />
                </div>
                <div class="col-span-6">
                  <label
                    for="sales_agent2"
                    class="block text-sm font-medium text-gray-700"
                    >Sales Agent 2</label
                  >
                  <input
                    type="text"
                    autocomplete="sales_agent2"
                    v-model="merchant.merchantInformation.salesAgent2"
                    class="
                      mt-1
                      focus:ring-indigo-500
                      focus:border-indigo-500
                      block
                      w-full
                      shadow-sm
                      sm:text-sm
                      border-gray-300
                      rounded-md
                    "
                    required
                  />
                </div>
              </div>
            </div>

            <div
              class="
                px-4
                py-3
                bg-gray-50
                text-right
                sm:px-6
                flex
                justify-between
                border
              "
            >
              <button
                type="button"
                class="
                  inline-flex
                  items-center
                  px-4
                  py-2
                  border border-gray-300
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-gray-700
                  bg-white
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
                :class="currentStep > 0 ? '' : 'invisible'"
                @click="back()"
              >
                Back
              </button>
              <button
                v-show="currentStep !== 4"
                type="button"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
                @click="next()"
              >
                Next
              </button>
              <button
                v-show="currentStep === 4"
                type="button"
                class="
                  inline-flex
                  justify-center
                  py-2
                  px-4
                  border border-transparent
                  shadow-sm
                  text-sm
                  font-medium
                  rounded-md
                  text-white
                  bg-indigo-600
                  hover:bg-indigo-700
                  focus:outline-none
                  focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500
                "
                @click="update()"
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { maska } from "maska";
import moment from "moment-timezone";
import Swal from "sweetalert2";
import Breadcrumbs from "@/components/Breadcrumbs.vue";
import { CheckIcon } from "@heroicons/vue/solid";
import { ref } from "vue";
import { required, email } from "vuelidate/lib/validators";
import { Money3Directive } from "v-money3";
import authHeader from "@/services/auth-header";

const pages = [
  { name: "List of Merchants", href: "/merchants", current: false },
  { name: "Edit Merchant Information", href: "#", current: true },
];

const businessEntities = [
  {
    name: "Corporation",
    description: "Company or group of people",
    corporation: true,
  },
  {
    name: "LLC",
    description:
      "Limited Liability Company, business structure that can hold assets",
    llc: true,
  },
  {
    name: "Partnership",
    description: "Two or more individuals",
    partnership: true,
  },
  {
    name: "Limited Partnership",
    description:
      "Two or more individuals but the limited partners are only liable up to the amount of their investment.",
    limitedPartnership: true,
  },
  {
    name: "Limited Liability Partnership",
    description:
      "Partnership in which some or all partners have limited liabilities",
    limitedLiabilityPartnership: true,
  },
  {
    name: "Sole Proprietorship",
    description: "Owned and controlled by an individual",
    soleProprietorship: true,
  },
  {
    name: "Others",
    description: "Please select here to type for other business entities",
    others: true,
  },
];

export default {
  directives: { maska, money3: Money3Directive },
  components: {
    Breadcrumbs,
    CheckIcon,
  },
  validations: {
    form: {
      email: {
        required,
        email,
      },
    },
  },
  setup() {
    const currentStep = ref(0);
    return {
      currentStep,
      pages,
      businessEntities,
    };
  },
  data() {
    return {
      merchant: "",
      business_formation: "",
      isStateRegulatory: false,
      isSameAddress: false,
      hasMultipleLocations: false,
      steps: [
        {
          name: "Basic Information",
          description: "All about basic information of merchant.",
          href: "#",
          status: "current",
        },
        {
          name: "Address Information",
          description: "Legal and physical address of merchant.",
          href: "#",
          status: "upcoming",
        },
        {
          name: "Business Information",
          description: "Owner/s and license information.",
          href: "#",
          status: "upcoming",
        },
        {
          name: "Bank Information",
          description: "Bank account information of merchant.",
          href: "#",
          status: "upcoming",
        },
        {
          name: "Sales Agents Information",
          description: "Edit names of sales agents.",
          href: "#",
          status: "upcoming",
        },
      ],
    };
  },
  created() {
    this.getMerchantInfo();
    this.moment = moment;
  },
  computed: {
    business_entity() {
      return JSON.parse(this.merchant.merchantInformation.businessEntity);
    },
  },
  watch: {
    business_formation(value) {
      this.business_formation = value;
      this.merchant.businessInformation.businessFormationDate = value;
    },
    "merchant.merchantInformation.bankAccountRountingNumber": function(
      routingNumber
    ) {
      if (routingNumber.length > 9) {
        this.merchant.merchantInformation.bankAccountRountingNumber = this.merchant.merchantInformation.bankAccountRountingNumber.substring(
          0,
          9
        );
      }
    },
  },
  methods: {
    async getMerchantInfo() {
      await axios
        .get(
          process.env.VUE_APP_API_URL + `/merchants/` + this.$route.params.id,
          {
            headers: authHeader(),
          }
        )
        .then((response) => {
          this.merchant = response.data.data;
          this.business_formation = moment(
            this.merchant.businessInformation.businessFormationDate
          ).format("YYYY-MM-DD");
          this.isStateRegulatory = Boolean(
            this.merchant.businessInformation.businessLicense
          );
          this.hasMultipleLocations =
            this.merchant.businessInformation.numberOfLocations > 1
              ? true
              : false;
          this.isSameAddress =
            this.merchant.corporateAddress.id !==
            this.merchant.physicalAddress.id
              ? false
              : true;
        });
    },
    formatDate(value) {
      return moment(value).format("yyyy-MM-DD");
    },
    back() {
      this.steps[this.currentStep].status = "upcoming";
      if (this.currentStep !== 0) this.currentStep -= 1;
      this.steps[this.currentStep].status = "current";
    },
    next() {
      this.steps[this.currentStep].status = "complete";
      this.currentStep += 1;
      this.steps[this.currentStep].status = "current";
    },
    stepperClick(id) {
      for (let i = 0; i < this.steps.length; i++) {
        if (i < id) this.steps[i].status = "complete";
        else if (i === id) this.steps[i].status = "current";
        else this.steps[i].status = "upcoming";
      }
      this.currentStep = id;
    },
    async update() {
      var merchant_info_params = {
        name: this.merchant.merchantInformation.name,
        email: this.merchant.merchantInformation.email,
        businessName: this.merchant.merchantInformation.businessName,
        physicalAddressId: this.isSameAddress
          ? this.merchant.corporateAddress.id
          : this.merchant.physicalAddress.id,
        corporateAddressId: this.merchant.corporateAddress.id,
        businessInformationId: this.merchant.businessInformation.id,
        businessEntity: JSON.stringify(this.business_entity),
        bankName: this.merchant.merchantInformation.bankName,
        bankType: this.merchant.merchantInformation.bankType,
        bankAccountNumber: this.merchant.merchantInformation.bankAccountNumber,
        bankAccountRountingNumber: this.merchant.merchantInformation
          .bankAccountRountingNumber,
        salesAgent1: this.merchant.merchantInformation.salesAgent1,
        salesAgent2: this.merchant.merchantInformation.salesAgent2,
        // sila_money_user_handle: this.merchant.merchantInformation.sila_money_user_handle,
        // kyc_status: this.merchant.merchantInformation.kyc_status,
      };

      var corporate_info_params = {
        streetAddress: this.merchant.corporateAddress.streetAddress,
        city: this.merchant.corporateAddress.city,
        state: this.merchant.corporateAddress.state,
        zipCode: this.merchant.corporateAddress.zipCode,
        country: this.merchant.corporateAddress.country,
        phoneNumber: this.merchant.corporateAddress.phoneNumber,
        faxNumber: this.merchant.corporateAddress.faxNumber,
      };

      var business_info_params = {
        owner1FirstName: this.merchant.businessInformation.owner1FirstName,
        owner1LastName: this.merchant.businessInformation.owner1LastName,
        owner2FirstName: this.merchant.businessInformation.owner2FirstName,
        owner2LastName: this.merchant.businessInformation.owner2LastName,
        title: this.merchant.businessInformation.title,
        primaryContactName: this.merchant.businessInformation
          .primaryContactName,
        idNumber: this.merchant.businessInformation.idNumber,
        tinType: this.merchant.businessInformation.tinType,
        businessLicense: this.merchant.businessInformation.businessLicense,
        businessLicenseState: this.merchant.businessInformation
          .businessLicenseState,
        numberOfLocations: this.merchant.businessInformation.numberOfLocations,
        businessFormationDate: moment(
          this.merchant.businessInformation.businessFormationDate
        ).format("YYYY-MM-DD HH:mm:ss"),
      };

      axios
        .put(
          process.env.VUE_APP_API_URL + `/merchants/` + this.$route.params.id,
          merchant_info_params,
          {
            headers: authHeader(),
          }
        )
        .then(() => {
          axios
            .put(
              process.env.VUE_APP_API_URL +
                `/addresses/` +
                this.merchant.corporateAddress.id,
              corporate_info_params,
              {
                headers: authHeader(),
              }
            )
            .then(() => {
              if (!this.isSameAddress) {
                var physical_info_params = {
                  streetAddress: this.merchant.physicalAddress.streetAddress,
                  city: this.merchant.physicalAddress.city,
                  state: this.merchant.physicalAddress.state,
                  zipCode: this.merchant.physicalAddress.zipCode,
                  country: this.merchant.physicalAddress.country,
                  phoneNumber: this.merchant.physicalAddress.phoneNumber,
                  faxNumber: this.merchant.physicalAddress.faxNumber,
                };
                axios
                  .put(
                    process.env.VUE_APP_API_URL +
                      `/addresses/` +
                      this.merchant.physicalAddress.id,
                    physical_info_params,
                    {
                      headers: authHeader(),
                    }
                  )
                  .then(() => {});
              }
            })
            .then(() => {
              axios
                .put(
                  process.env.VUE_APP_API_URL +
                    `/business-informations/` +
                    this.merchant.businessInformation.id,
                  business_info_params,
                  {
                    headers: authHeader(),
                  }
                )
                .then(() => {
                  Swal.fire({
                    title: "Congratulations",
                    icon: "success",
                    text:
                      "You have successfully updated the merchant information.",
                    confirmButtonText: `OK`,
                  }).then((result) => {
                    console.log(result);
                    // if (result.isConfirmed) {
                    //   window.location.href =
                    //     "/merchants/" + this.$route.params.id + "/show";
                    // }
                  });
                });
            })
            .catch(function(error) {
              if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
                console.log(error.response.data.errors[0].message);
                Swal.fire({
                  title: "Oops! Something went wrong.",
                  text: error.response.data.errors[0].message,
                  icon: "error",
                });
              } else if (error.request) {
                console.log(error.request);
                Swal.fire({
                  title: "Oops! Something went wrong.",
                  text: error.request,
                  icon: "error",
                });
              } else {
                console.log("Error", error.message);
                Swal.fire({
                  title: "Oops! Something went wrong.",
                  text: error.message,
                  icon: "error",
                });
              }
            });
        });
    },
  },
};
</script>
