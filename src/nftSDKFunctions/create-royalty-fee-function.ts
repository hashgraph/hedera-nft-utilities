/*-
 *
 * Hedera NFT Utilities
 *
 * Copyright (C) 2024 Hedera Hashgraph, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { CustomRoyaltyFee } from '@hashgraph/sdk';
import { createFixedFeeFunction } from './create-fixed-fee-function';
import { RoyaltyFeeType } from '../types/fees.module';
import { validatePropsForRoyaltyFeeFunction } from '../utils/validate-props';

export const createRoyaltyFeeFunction = ({
  collectorAccountId,
  numerator,
  denominator,
  fallbackFee,
  allCollectorsAreExempt,
}: RoyaltyFeeType) => {
  validatePropsForRoyaltyFeeFunction({ collectorAccountId, numerator, denominator });

  const royaltyFee = new CustomRoyaltyFee()
    .setFeeCollectorAccountId(collectorAccountId)
    .setNumerator(numerator)
    .setDenominator(denominator);

  if (allCollectorsAreExempt) {
    royaltyFee.setAllCollectorsAreExempt(allCollectorsAreExempt);
  }

  if (fallbackFee) {
    royaltyFee.setFallbackFee(
      createFixedFeeFunction({
        collectorAccountId: fallbackFee.collectorAccountId,
        hbarAmount: fallbackFee.hbarAmount,
        amount: fallbackFee.amount,
        denominatingTokenId: fallbackFee.denominatingTokenId,
        allCollectorsAreExempt: fallbackFee.allCollectorsAreExempt,
      })
    );
  }

  return royaltyFee;
};